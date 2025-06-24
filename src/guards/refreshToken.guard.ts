import { ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';
import { RefreshTokenService } from '@services/tokenService/refreshToken.service';
import { RedisService } from '@services/redisService/redis.service';
import { TokenNotProvidedException } from '@exceptions/unauthorized/tokenNotProvided.exception';
import { extractToken } from '@helpers/extractToken';

import { AbstractTokenGuard } from './abstractToken.guard';

@Injectable()
export class RefreshTokenGuard extends AbstractTokenGuard {
  constructor(
    readonly refreshTokenService: RefreshTokenService,
    readonly redisService: RedisService,
  ) {
    super(
      'REFRESH_TOKEN_EXPIRED',
      'Refresh token is expired',
      PREFIX_REDIS_KEY.REFRESH_TOKEN,
      redisService,
      refreshTokenService,
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const bearerToken = req.headers.refresh_token?.toString();
    const token = bearerToken && extractToken(bearerToken);

    if (!token) {
      throw new TokenNotProvidedException();
    }

    const clientId = req.headers['client-id']?.toString();
    const authUser = await this.verifyToken(token, clientId);

    req.user = authUser;

    return true;
  }
}
