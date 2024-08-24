import { JwtService } from '@nestjs/jwt';
import { ConfigurationService } from '../../config/configuration.service';
import { TokenService } from './token.service';
import { REDIS_KEY } from '../redisService/redisKey';
import { TokenExpiredException } from '../../exceptions/unauthorized/tokenExpired.exception';
import { RedisService } from '../redisService/redis.service';
import { TokenInfo } from './authUser';
import { REFRESH_TOKEN_SERVICE } from '../../helpers/constant';

export const refreshTokenService = {
  provide: REFRESH_TOKEN_SERVICE,
  useFactory(
    configurationService: ConfigurationService,
    redisService: RedisService,
    jwtService: JwtService,
  ): TokenService {
    const tokenInfo: TokenInfo = {
      redisKey: REDIS_KEY.REFRESH_TOKEN,
      secretKey: configurationService.refreshTokenKey,
      expiration: configurationService.refreshTokenExpiredIn,
      error: new TokenExpiredException(
        'REFRESH_TOKEN_EXPIRED',
        'Refresh token is expired',
      ),
    };

    return new TokenService(tokenInfo, redisService, jwtService);
  },
  inject: [ConfigurationService, RedisService, JwtService],
};
