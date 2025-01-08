import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, mergeMap } from 'rxjs';
import { AuthUser } from '../services/tokenService/authUser';
import { AppLoggerService } from '../services/appLoggerService/appLogger.service';
import { Request } from 'express';
import { extractToken } from '../helpers/extractToken';
import { IUserDto } from '../dtos/users/user.interface';
import { USER_TYPE } from '@prisma/client';
import { AccessTokenService } from '../services/tokenService/accessToken.service';
import { RedisService } from '../services/redisService/redis.service';
import { AppConfigService } from '../appConfigs/appConfig.service';
import { REDIS_KEY } from '../services/redisService/redisKey';

@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly logger: AppLoggerService,
    private readonly redisService: RedisService,
    private readonly configService: AppConfigService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<IUserDto>,
  ): Promise<Observable<IUserDto>> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse();
    const clientId =
      req.headers['client-id'] && req.headers['client-id'].toString();

    return next.handle().pipe(
      mergeMap(async (data) => {
        try {
          const payload: AuthUser = {
            id: data.id.toString(),
            email: data.email || '',
            type: data.type || USER_TYPE.USER,
            isVerify: data.isVerified,
            storeId: (data.store && data.store.id) || undefined,
          };

          const accessToken =
            await this.accessTokenService.tokenGenerator(payload);
          await this.storeTokenToRedis(
            accessToken,
            payload,
            REDIS_KEY.ACCESS_TOKEN,
            this.configService.accessTokenExpiredIn,
            clientId,
          );

          const bearerToken =
            req.headers.refresh_token && req.headers.refresh_token.toString();
          const refreshToken = bearerToken && extractToken(bearerToken);

          res.setHeader('Authorization', accessToken);
          res.setHeader('refresh-token', refreshToken);

          return data;
        } catch (error) {
          this.logger.error('🚀 ~ AuthInterception ~ map ~ error:', error);

          return data;
        }
      }),
    );
  }

  private async storeTokenToRedis(
    token: string,
    payload: AuthUser,
    redisKey: string,
    expiration: number,
    clientId?: string,
  ): Promise<void> {
    const key = clientId
      ? `${redisKey}_${payload.id}_${clientId}`
      : `${redisKey}_${payload.id}`;

    await this.redisService.set(key, token, expiration);
  }
}
