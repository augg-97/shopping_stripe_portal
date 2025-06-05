import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { RefreshTokenService } from './refreshToken/refreshToken.service';
import { ForgotPasswordService } from './forgotPassword/forgotPassword.service';
import { ResetPasswordService } from './resetPassword/resetPassword.service';
import { VerifyEmailService } from './verifyEmail/verifyEmail.service';
import { EmailUIUrlService } from './register/emailUIUrl.service';
import { ValidateEmailTokenService } from './resetPassword/validateEmailToken.service';
import { ResendVerifyEmailService } from './resendVerifyEmail/resendVerifyEmail.service';
import { LogoutService } from './logout/logout.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    RegisterService,
    LoginService,
    RefreshTokenService,
    ForgotPasswordService,
    ResetPasswordService,
    VerifyEmailService,
    EmailUIUrlService,
    ValidateEmailTokenService,
    ResendVerifyEmailService,
    LogoutService,
  ],
  exports: [],
})
export class AuthModule {}
