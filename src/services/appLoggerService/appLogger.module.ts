import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './appLogger.service';
import { LoggerContextService } from './loggerContext.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AppLoggerService, LoggerContextService],
  exports: [AppLoggerService, LoggerContextService],
})
export class AppLoggerModule {}
