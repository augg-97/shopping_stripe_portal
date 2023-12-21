import { Injectable } from "@nestjs/common";
import { IConfig } from "./config";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ConfigurationService implements IConfig {
  constructor(private configService: ConfigService<IConfig, true>) {}

  get nodeEnv(): string {
    return this.configService.get("nodeEnv");
  }

  get port(): number {
    return this.configService.get("port");
  }

  get saltRounds(): number {
    return this.configService.get("saltRounds");
  }

  get redisHost(): string {
    return this.configService.get("redisHost");
  }

  get redisPort(): number {
    return this.configService.get("redisPort");
  }

  get accessTokenKey(): string {
    return this.configService.get("accessTokenKey");
  }

  get accessTokenExpiredIn(): number {
    return this.configService.get("accessTokenExpiredIn");
  }

  get refreshTokenKey(): string {
    return this.configService.get("refreshTokenKey");
  }

  get refreshTokenExpiredIn(): number {
    return this.configService.get("refreshTokenExpiredIn");
  }
}
