import { Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import { ConfigurationModule } from "src/config/configuration.module";

@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
