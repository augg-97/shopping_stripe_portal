import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { context, trace } from '@opentelemetry/api';

import { LoggerContextService } from '@services/appLoggerService/loggerContext.service';

import { uuidGenerator } from '../pkgs/uuidGenerator';

@Injectable()
export class TraceIdMiddleware implements NestMiddleware {
  constructor(private readonly loggerContextService: LoggerContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const activeSpan = trace.getSpan(context.active());
    const traceId = activeSpan
      ? activeSpan.spanContext().traceId
      : uuidGenerator();
    req.headers['trace-id'] = traceId;
    res.setHeader('x-trace-id', traceId);
    this.loggerContextService.setContext({ traceId }, () => {
      next();
    });
  }
}
