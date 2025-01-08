import { Global, Module } from '@nestjs/common';
import { UploadService } from './upload.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
