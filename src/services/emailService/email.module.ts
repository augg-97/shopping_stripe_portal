import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '../loggerService/logger.module';
import { emailClientService } from './emailClient.service';
import {
  EMAIL_FORGOT_PASSWORD_SERVICE,
  EMAIL_VERIFY_SERVICE,
} from '../../helpers/constant';
import { emailVerifyService } from './emailVerify.service';
import { emailForgotPasswordService } from './emailForgotPassword.service';

@Global()
@Module({
  imports: [LoggerModule],
  controllers: [],
  providers: [
    emailClientService,
    emailForgotPasswordService,
    emailVerifyService,
  ],
  exports: [EMAIL_FORGOT_PASSWORD_SERVICE, EMAIL_VERIFY_SERVICE],
})
export class EmailModule {}
