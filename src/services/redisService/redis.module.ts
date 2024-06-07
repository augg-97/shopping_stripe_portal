import { Module } from "@nestjs/common";
import { createClient } from "@redis/client";
import { RedisService } from "./redis.service";
import { ConfigurationService } from "../../config/configuration.service";
import { ConfigurationModule } from "../../config/configuration.module";

@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: async (configurationService: ConfigurationService) => {
        const redisHost = configurationService.redisHost;
        const redisPort = configurationService.redisPort;
        const redisPassword = configurationService.redisPassword;
        const url = `redis://:${redisPassword}@${redisHost}:${redisPort}`;

        const redisClient = createClient({
          url,
        });
        await redisClient.connect();
        return redisClient;
      },
      inject: [ConfigurationService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
