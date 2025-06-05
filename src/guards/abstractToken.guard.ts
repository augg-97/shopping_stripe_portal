import { CanActivate, ExecutionContext } from '@nestjs/common';

import { TokenInvalidException } from '@exceptions/unauthorized/tokenInvalid.exception';
import { RedisService } from '@services/redisService/redis.service';
import { REDIS_KEY } from '@services/redisService/redisKey';
import { AuthUser } from '@services/tokenService/authUser';
import { TokenService } from '@services/tokenService/token.service';
import {
  TokenExpiredErrorCode,
  TokenExpiredException,
  TokenExpiredMessage,
} from '@exceptions/unauthorized/tokenExpired.exception';

export abstract class AbstractTokenGuard implements CanActivate {
  protected tokenExpiredErrorCode: TokenExpiredErrorCode;
  protected tokenExpiredErrorMessage: TokenExpiredMessage;
  protected redisKey: REDIS_KEY;

  constructor(
    _tokenExpiredErrorCode: TokenExpiredErrorCode,
    _tokenExpiredErrorMessage: TokenExpiredMessage,
    _redisKey: REDIS_KEY,
    protected readonly redisService: RedisService,
    protected readonly tokenService: TokenService,
  ) {
    this.tokenExpiredErrorCode = _tokenExpiredErrorCode;
    this.tokenExpiredErrorMessage = _tokenExpiredErrorMessage;
    this.redisKey = _redisKey;
  }

  abstract canActivate(context: ExecutionContext): Promise<boolean>;

  protected async verifyToken(
    token: string,
    clientId?: string,
  ): Promise<AuthUser> {
    const authUser = await this.tokenService.tokenVerify(token);

    if (!authUser) {
      throw new TokenInvalidException();
    }

    const redisKey = clientId
      ? this.redisService.buildCacheKey(this.redisKey, authUser.id, clientId)
      : this.redisService.buildCacheKey(this.redisKey, authUser.id);
    const getToken = await this.redisService.get(redisKey);

    if (!getToken) {
      throw new TokenExpiredException(
        this.tokenExpiredErrorCode,
        this.tokenExpiredErrorMessage,
      );
    }

    return authUser;
  }
}
