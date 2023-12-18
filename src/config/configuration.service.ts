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
}
