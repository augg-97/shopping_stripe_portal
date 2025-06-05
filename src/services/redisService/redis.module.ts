import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';

import { AppConfigService } from '@appConfigs/appConfig.service';

import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (appConfigService: AppConfigService) => {
        const redisHost = appConfigService.redisHost;
        const redisPort = appConfigService.redisPort;
        const redisPassword = appConfigService.redisPassword;
        const url = `redis://:${redisPassword}@${redisHost}:${redisPort.toString()}`;

        const redisClient = createClient({
          url,
        });
        await redisClient.connect();

        return redisClient;
      },
      inject: [AppConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
