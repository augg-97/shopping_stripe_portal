import { Global, Module } from '@nestjs/common';
import { createClient } from '@redis/client';
import { RedisService } from './redis.service';
import { AppConfigService } from '../../appConfigs/appConfig.service';

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
        const url = `redis://:${redisPassword}@${redisHost}:${redisPort}`;

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
