import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from "@nestjs/common";
import { ValidationError, isString } from "class-validator";
import { Request, Response } from "express";
import { LoggerService } from "src/services/loggerService/logger.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const correlationId = request.headers["correlationId"];

    // this.loggerService.error(
    //   `Error occur in request ${request.url}`,
    //   exception,
    // );
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse();
    console.log(
      "🚀 ~ file: httpException.filter.ts:29 ~ HttpExceptionFilter ~ exceptionRes:",
      exceptionRes,
    );

    if (isString(exceptionRes)) {
      const errorRes = {
        correlationId,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exceptionRes,
      };
      // this.loggerService.error(
      //   `Error occur in request ${request.url}`,
      //   errorRes,
      // );
      return response.status(status).json(errorRes);
    }

    const errorRes = {
      correlationId,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...exceptionRes,
    };

    return response.status(status).json(errorRes);
  }
}
