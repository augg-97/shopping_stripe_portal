import { Global, Module } from '@nestjs/common';

import { AppLoggerService } from './appLogger.service';
import { LoggerContextService } from './loggerContext.service';
import { LoggerClient } from './logger.client';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [LoggerClient, AppLoggerService, LoggerContextService],
  exports: [AppLoggerService, LoggerContextService],
})
export class AppLoggerModule {}
