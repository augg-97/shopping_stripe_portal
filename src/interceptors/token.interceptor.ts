import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, mergeMap } from 'rxjs';

import { AccessTokenService } from '@services/tokenService/accessToken.service';
import { RefreshTokenService } from '@services/tokenService/refreshToken.service';
import { AppLoggerService } from '@services/appLoggerService/appLogger.service';
import { RedisService } from '@services/redisService/redis.service';
import { AppConfigService } from '@appConfigs/appConfig.service';
import { AuthUser } from '@services/tokenService/authUser';
import { UserIncludeType } from '@repositories/user.repository';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly logger: AppLoggerService,
    private readonly redisService: RedisService,
    private readonly configService: AppConfigService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<UserIncludeType>,
  ): Promise<Observable<UserIncludeType>> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    const clientId = req.headers['client-id']?.toString();

    return next.handle().pipe(
      mergeMap(async (data) => {
        try {
          const payload: AuthUser = {
            id: data.id.toString(),
            email: data.email,
            type: data.type,
            isVerify: data.isVerify,
            storeId: data.stores[0]?.id,
          };

          const accessToken =
            await this.accessTokenService.tokenGenerator(payload);
          await this.storeTokenToRedis(
            accessToken,
            payload,
            PREFIX_REDIS_KEY.ACCESS_TOKEN,
            this.configService.accessTokenExpiredIn,
            clientId,
          );

          const refreshToken =
            await this.refreshTokenService.tokenGenerator(payload);
          await this.storeTokenToRedis(
            refreshToken,
            payload,
            PREFIX_REDIS_KEY.REFRESH_TOKEN,
            this.configService.refreshTokenExpiredIn,
            clientId,
          );

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
    redisKey: PREFIX_REDIS_KEY,
    expiration: number,
    clientId?: string,
  ): Promise<void> {
    const key = clientId
      ? this.redisService.buildCacheKey(redisKey, payload.id, clientId)
      : this.redisService.buildCacheKey(redisKey, payload.id);

    await this.redisService.setWithEX(key, token, expiration);
  }
}
