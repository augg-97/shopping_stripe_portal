import { Global, Module } from '@nestjs/common';

import { AppConfigModule } from '@appConfigs/appConfig.module';

import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [AppConfigModule],
  controllers: [],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
