import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { isString } from 'class-validator';

import { AppLoggerService } from '../services/appLoggerService/appLogger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLoggerService) {
    this.logger.serviceName = GlobalExceptionFilter.name;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const correlationId = request.headers['correlation-id'];

    this.logger.error(exception);

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const errorCode =
        !isString(exceptionResponse) &&
        this.isHttpExceptionResponse(exceptionResponse)
          ? exceptionResponse.error.toUpperCase()
          : HttpStatus[status];

      const message =
        !isString(exceptionResponse) &&
        this.isHttpExceptionResponse(exceptionResponse)
          ? exceptionResponse.message
          : exceptionResponse;

      return response.status(status).json({
        correlationId,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        errorCode: errorCode,
        message,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      correlationId,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: exception.message || 'Something went wrong!',
    });
  }

  private isHttpExceptionResponse(
    response: object,
  ): response is { message: string; error: string } {
    return 'error' in response && 'message' in response;
  }
}
