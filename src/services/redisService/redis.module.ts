import { Module } from "@nestjs/common";
import { createClient } from "@redis/client";
import { RedisService } from "./redis.service";
import { ConfigurationModule } from "src/config/configuration.module";
import { ConfigurationService } from "src/config/configuration.service";

@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [
    {
      provide: "REDIS_CLIENT",
      useFactory: async (configurationService: ConfigurationService) => {
        const redisHost = configurationService.redisHost;
        const redisPort = configurationService.redisPort;
        const url = `redis://${redisHost}:${redisPort}`;

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
