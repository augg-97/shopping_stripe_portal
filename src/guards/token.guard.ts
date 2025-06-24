import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { DECORATOR } from '@decorators/decorator.enum';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';
import { AccessTokenService } from '@services/tokenService/accessToken.service';
import { RedisService } from '@services/redisService/redis.service';
import { extractToken } from '@helpers/extractToken';
import { TokenNotProvidedException } from '@exceptions/unauthorized/tokenNotProvided.exception';

import { AbstractTokenGuard } from './abstractToken.guard';

@Injectable()
export class TokenGuard extends AbstractTokenGuard {
  constructor(
    private readonly reflector: Reflector,
    readonly accessTokenService: AccessTokenService,
    readonly redisService: RedisService,
  ) {
    super(
      'ACCESS_TOKEN_EXPIRED',
      'Access token is expired',
      PREFIX_REDIS_KEY.ACCESS_TOKEN,
      redisService,
      accessTokenService,
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const bearerToken = req.headers.authorization;
    const token = bearerToken && extractToken(bearerToken);

    if (token) {
      const clientId = req.headers['client-id']?.toString();
      const authUser = await super.verifyToken(token, clientId);
      req.user = authUser;

      return true;
    }

    const isPublic = this.reflector.get<boolean | undefined>(
      DECORATOR.IS_PUBLIC,
      context.getHandler(),
    );

    if (!isPublic) {
      throw new TokenNotProvidedException();
    }

    return true;
  }
}
