import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '../loggerService/logger.module';
import { UploadService } from './upload.service';

@Global()
@Module({
  imports: [LoggerModule],
  controllers: [],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
