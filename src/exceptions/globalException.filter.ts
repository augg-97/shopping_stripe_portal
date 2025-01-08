import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLoggerService } from '../services/appLoggerService/appLogger.service';
import { BaseHttpException } from './baseHttp.exception';

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

    this.logger.error(`Error occur in request ${request.url}`, exception);

    if (exception instanceof BaseHttpException) {
      const status = exception.getStatus();
      const { errorCode, message } = exception.getResponse();

      return response.status(status).json({
        correlationId,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        errorCode,
        message,
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      correlationId,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong!',
    });
  }
}
