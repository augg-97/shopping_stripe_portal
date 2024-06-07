import { JwtService } from "@nestjs/jwt";
import { ConfigurationService } from "../../config/configuration.service";
import { TokenService } from "./token.service";
import { REDIS_KEY } from "../redisService/redisKey";
import { TokenExpiredException } from "../../exceptions/unauthorized/tokenExpired.exception";
import { RedisService } from "../redisService/redis.service";
import { TokenInfo } from "./authUser";
import { ACCESS_TOKEN_SERVICE } from "../../helpers/constant";

export const accessTokenService = {
  provide: ACCESS_TOKEN_SERVICE,
  useFactory(
    configurationService: ConfigurationService,
    redisService: RedisService,
    jwtService: JwtService,
  ): TokenService {
    const tokenInfo: TokenInfo = {
      redisKey: REDIS_KEY.ACCESS_TOKEN,
      secretKey: configurationService.accessTokenKey,
      expiration: configurationService.accessTokenExpiredIn,
      error: new TokenExpiredException(
        "ACCESS_TOKEN_EXPIRED",
        "Access token is expired",
      ),
    };

    return new TokenService(tokenInfo, redisService, jwtService);
  },
  inject: [ConfigurationService, RedisService, JwtService],
};
