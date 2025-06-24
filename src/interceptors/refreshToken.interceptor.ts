import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, mergeMap } from 'rxjs';
import { Request } from 'express';

import { AccessTokenService } from '@services/tokenService/accessToken.service';
import { AppLoggerService } from '@services/appLoggerService/appLogger.service';
import { RedisService } from '@services/redisService/redis.service';
import { AppConfigService } from '@appConfigs/appConfig.service';
import { AuthUser } from '@services/tokenService/authUser';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';
import { extractToken } from '@helpers/extractToken';
import { UserIncludeType } from '@repositories/user.repository';

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
    next: CallHandler<UserIncludeType>,
  ): Promise<Observable<UserIncludeType>> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse();
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

          const bearerToken = req.headers.refresh_token?.toString();
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
