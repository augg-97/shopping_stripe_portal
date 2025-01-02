import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '../../appConfigs/appConfig.service';
import { TokenService } from './token.service';
import { REDIS_KEY } from '../redisService/redisKey';
import { LoggerService } from '../loggerService/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenService extends TokenService {
  constructor(
    protected jwtService: JwtService,
    protected readonly loggerService: LoggerService,
    private readonly configService: AppConfigService,
  ) {
    super(jwtService, loggerService);
    this.redisKey = REDIS_KEY.ACCESS_TOKEN;
    this.secretKey = this.configService.refreshTokenKey;
    this.expiration = this.configService.refreshTokenExpiredIn;
  }
}
