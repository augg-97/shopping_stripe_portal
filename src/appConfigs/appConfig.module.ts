import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { appConfiguration } from './appConfiguration';
import { AppConfigService } from './appConfig.service';
import { minioConfig } from './minio.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration, minioConfig],
    }),
  ],
  controllers: [],
  providers: [AppConfigService, ConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
