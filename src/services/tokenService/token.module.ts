import { Module } from "@nestjs/common";
import { ConfigurationModule } from "../../config/configuration.module";
import { accessTokenService } from "./accessToken.service";
import { refreshTokenService } from "./refreshToken.service";
import { RedisModule } from "../redisService/redis.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [ConfigurationModule, RedisModule, JwtModule],
  controllers: [],
  providers: [accessTokenService, refreshTokenService],
  exports: [accessTokenService, refreshTokenService],
})
export class TokenModule {}
