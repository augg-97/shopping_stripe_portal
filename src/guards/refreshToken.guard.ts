import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenNotProvidedException } from '../exceptions/unauthorized/tokenNotProvided.exception';
import { extractToken } from '../helpers/extractToken';
import { RefreshTokenService } from '../services/tokenService/refreshToken.service';
import { TokenInvalidException } from '../exceptions/unauthorized/tokenInvalid.exception';
import { REDIS_KEY } from '../services/redisService/redisKey';
import { RedisService } from '../services/redisService/redis.service';
import { TokenExpiredException } from '../exceptions/unauthorized/tokenExpired.exception';
import { AuthUser } from '../services/tokenService/authUser';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const bearerToken =
      req.headers.refresh_token && req.headers.refresh_token.toString();
    const token = bearerToken && extractToken(bearerToken);

    if (!token) {
      throw new TokenNotProvidedException();
    }

    const clientId =
      req.headers['client_id'] && req.headers['client_id'].toString();
    const authUser = await this.verifyToken(token, clientId);

    req.user = authUser;

    return true;
  }

  async verifyToken(token: string, clientId?: string): Promise<AuthUser> {
    const authUser = await this.refreshTokenService.tokenVerify(token);

    if (!authUser) {
      throw new TokenInvalidException();
    }

    const redisKey = clientId
      ? `${REDIS_KEY.REFRESH_TOKEN}_${authUser.id}_${clientId}`
      : `${REDIS_KEY.REFRESH_TOKEN}_${authUser.id}`;
    const getToken = await this.redisService.get(redisKey);

    if (!getToken) {
      throw new TokenExpiredException(
        'REFRESH_TOKEN_EXPIRED',
        'Refresh token is expired',
      );
    }

    return authUser;
  }
}
