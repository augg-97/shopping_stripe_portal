import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigurationModule } from '../../config/configuration.module';

@Global()
@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
