import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { isString } from 'class-validator';
import { SentryExceptionCaptured } from '@sentry/nestjs';

import { AppLoggerService } from '@services/appLoggerService/appLogger.service';

import { BaseHttpException } from './baseHttp.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLoggerService) {
    this.logger.serviceName = GlobalExceptionFilter.name;
  }

  @SentryExceptionCaptured()
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const traceId = request.headers['trace-id'];

    this.logger.error(exception);

    if (exception instanceof BaseHttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const errorCode = exceptionResponse.errorCode;
      const message = exceptionResponse.message;

      return response.status(status).json({
        traceId,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        errorCode: errorCode,
        message,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      traceId,
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
