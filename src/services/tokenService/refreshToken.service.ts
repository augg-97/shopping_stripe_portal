import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { AppConfigService } from '@appConfigs/appConfig.service';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

import { AppLoggerService } from '../appLoggerService/appLogger.service';

import { TokenService } from './token.service';

@Injectable()
export class RefreshTokenService extends TokenService {
  constructor(
    protected jwtService: JwtService,
    protected readonly logger: AppLoggerService,
    private readonly configService: AppConfigService,
  ) {
    super(jwtService, logger);
    this.redisKey = PREFIX_REDIS_KEY.ACCESS_TOKEN;
    this.secretKey = this.configService.refreshTokenKey;
    this.expiration = this.configService.refreshTokenExpiredIn;
  }
}
