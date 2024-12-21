import { Injectable } from '@nestjs/common';
import { IAppConfig } from './appConfig';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService implements IAppConfig {
  constructor(private configService: ConfigService<IAppConfig, true>) {}

  get nodeEnv(): string {
    return this.configService.get('nodeEnv');
  }

  get port(): number {
    return this.configService.get('port');
  }

  get debugQuery(): boolean {
    return this.configService.get('debugQuery');
  }

  get saltRounds(): number {
    return this.configService.get('saltRounds');
  }

  get redisHost(): string {
    return this.configService.get('redisHost');
  }

  get redisPort(): number {
    return this.configService.get('redisPort');
  }

  get redisPassword(): string {
    return this.configService.get('redisPassword');
  }

  get accessTokenKey(): string {
    return this.configService.get('accessTokenKey');
  }

  get accessTokenExpiredIn(): number {
    return this.configService.get('accessTokenExpiredIn');
  }

  get refreshTokenKey(): string {
    return this.configService.get('refreshTokenKey');
  }

  get refreshTokenExpiredIn(): number {
    return this.configService.get('refreshTokenExpiredIn');
  }

  get imageBaseUrl(): string {
    return this.configService.get('imageBaseUrl');
  }

  get emailServiceHost(): string {
    return this.configService.get('emailServiceHost');
  }

  get emailServiceUserName(): string {
    return this.configService.get('emailServiceUserName');
  }

  get emailServicePassword(): string {
    return this.configService.get('emailServicePassword');
  }

  get emailServicePort(): number {
    return this.configService.get('emailServicePort');
  }

  get emailServiceSender(): string {
    return this.configService.get('emailServiceSender');
  }

  get resetPasswordUIUrl(): string {
    return this.configService.get('resetPasswordUIUrl');
  }

  get verifyEmailUIUrl(): string {
    return this.configService.get('verifyEmailUIUrl');
  }
}
