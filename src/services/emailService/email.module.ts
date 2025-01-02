import { Global, Module } from '@nestjs/common';
import { LoggerModule } from '../loggerService/logger.module';
import { EmailVerifyService } from './emailVerify.service';
import { EmailForgotPasswordService } from './emailForgotPassword.service';

@Global()
@Module({
  imports: [LoggerModule],
  controllers: [],
  providers: [EmailForgotPasswordService, EmailVerifyService],
  exports: [EmailForgotPasswordService, EmailVerifyService],
})
export class EmailModule {}
