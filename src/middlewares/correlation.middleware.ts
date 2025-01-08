import { NextFunction, Request, Response } from 'express';
import { uuidGenerator } from '../pkgs/uuidGenerator';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerContextService } from '@services/appLoggerService/loggerContext.service';

@Injectable()
export class CorrelationMiddleware implements NestMiddleware {
  constructor(private readonly loggerContextService: LoggerContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const correlationId = uuidGenerator();
    req.headers['correlation-id'] = correlationId;
    res.setHeader('correlation-id', correlationId);
    this.loggerContextService.setContext({ correlationId }, () => next());
  }
}
