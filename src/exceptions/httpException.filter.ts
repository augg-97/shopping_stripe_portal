import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { isString } from "class-validator";
import { Request, Response } from "express";
import { LoggerService } from "src/services/loggerService/logger.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    const correlationId = request.headers["correlationId"];

    const errorRes = {
      correlationId,
      statusCode: status,
      status: HttpStatus[status],
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        !isString(message) &&
        "message" in message &&
        Array.isArray(message.message)
          ? message.message[0]
          : message,
    };
    this.loggerService.error(`Error occur in request ${request.url}`, errorRes);

    return response.status(status).json(errorRes);
  }
}
