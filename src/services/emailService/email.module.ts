import { Global, Module } from '@nestjs/common';
import { EmailVerifyService } from './emailVerify.service';
import { EmailForgotPasswordService } from './emailForgotPassword.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [EmailForgotPasswordService, EmailVerifyService],
  exports: [EmailForgotPasswordService, EmailVerifyService],
})
export class EmailModule {}
