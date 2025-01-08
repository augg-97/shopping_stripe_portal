import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { TokenNotProvidedException } from '../exceptions/unauthorized/tokenNotProvided.exception';
import { extractToken } from '../helpers/extractToken';
import { AccessTokenService } from '../services/tokenService/accessToken.service';
import { RedisService } from '../services/redisService/redis.service';
import { REDIS_KEY } from '../services/redisService/redisKey';
import { AuthUser } from '../services/tokenService/authUser';
import { TokenInvalidException } from '../exceptions/unauthorized/tokenInvalid.exception';
import { TokenExpiredException } from '../exceptions/unauthorized/tokenExpired.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenService: AccessTokenService,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const bearerToken = req.headers.authorization;
    const token = bearerToken && extractToken(bearerToken);

    if (token) {
      const clientId =
        req.headers['client-id'] && req.headers['client-id'].toString();

      const authUser = await this.verifyToken(token, clientId);

      req.user = authUser;

      return true;
    }

    const isPublic = this.reflector.get<boolean | undefined>(
      'isPublic',
      context.getHandler(),
    );

    if (!isPublic) {
      throw new TokenNotProvidedException();
    }

    return true;
  }

  private async verifyToken(
    token: string,
    clientId?: string,
  ): Promise<AuthUser> {
    const authUser = await this.accessTokenService.tokenVerify(token);

    if (!authUser) {
      throw new TokenInvalidException();
    }

    const redisKey = clientId
      ? `${REDIS_KEY.ACCESS_TOKEN}_${authUser.id}_${clientId}`
      : `${REDIS_KEY.ACCESS_TOKEN}_${authUser.id}`;
    const getToken = await this.redisService.get(redisKey);

    if (!getToken) {
      throw new TokenExpiredException(
        'ACCESS_TOKEN_EXPIRED',
        'Access token is expired',
      );
    }

    return authUser;
  }
}
