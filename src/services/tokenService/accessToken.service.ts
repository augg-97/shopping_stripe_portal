import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { AppConfigService } from '@appConfigs/appConfig.service';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

import { AppLoggerService } from '../appLoggerService/appLogger.service';

import { TokenService } from './token.service';

@Injectable()
export class AccessTokenService extends TokenService {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly logger: AppLoggerService,
    private readonly configService: AppConfigService,
  ) {
    super(jwtService, logger);
    this.redisKey = PREFIX_REDIS_KEY.ACCESS_TOKEN;
    this.secretKey = this.configService.accessTokenKey;
    this.expiration = this.configService.accessTokenExpiredIn;
  }
}
