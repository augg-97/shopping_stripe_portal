import { Module } from "@nestjs/common";
import { ConfigurationModule } from "../../config/configuration.module";
import { LoggerModule } from "../loggerService/logger.module";
import { emailClientService } from "./emailClient.service";
import { emailForgotPasswordService } from "./emailForgorPassword.service";
import {
  EMAIL_FORGOT_PASSWORD_SERVICE,
  EMAIL_VERIFY_SERVICE,
} from "../../helpers/constant";
import { emailVerifyService } from "./emailVerify.service";

@Module({
  imports: [ConfigurationModule, LoggerModule],
  controllers: [],
  providers: [
    emailClientService,
    emailForgotPasswordService,
    emailVerifyService,
  ],
  exports: [EMAIL_FORGOT_PASSWORD_SERVICE, EMAIL_VERIFY_SERVICE],
})
export class EmailModule {}
