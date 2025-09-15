import { Global, Module } from '@nestjs/common';

import { WebServerUploadService } from './webServerUpload.service';
import { MinioUploadService } from './minioUpload.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [WebServerUploadService, MinioUploadService],
  exports: [WebServerUploadService, MinioUploadService],
})
export class UploadModule {}
