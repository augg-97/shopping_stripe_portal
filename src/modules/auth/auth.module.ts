import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RegisterService } from "./register/register.service";
import { PrismaModule } from "../../services/prismaService/prisma.module";
import { PasswordModule } from "../../services/passwordService/password.module";
import { TokenModule } from "../../services/tokenService/token.module";
import { LoggerModule } from "../../services/loggerService/logger.module";
import { LoginService } from "./login/login.service";
import { RefreshTokenService } from "./refreshToken/refreshToken.service";
import { ForgotPasswordService } from "./forgotPassword/forgotPassword.service";
import { RedisModule } from "../../services/redisService/redis.module";
import { ConfigurationModule } from "../../config/configuration.module";
import { EmailModule } from "../../services/emailService/email.module";
import { ResetPasswordService } from "./resetPassword/resetPassword.service";
import { VerifyEmailService } from "./verifyEmail/verifyEmail.service";
import { EmailUIUrlService } from "./register/emailUIUrl.service";
import { ValidateEmailTokenService } from "./resetPassword/validateEmailToken.service";
import { ResendVerifyEmailService } from "./resendVerifyEmail/resendVerifyEmail.service";
import { LogoutService } from "./logout/logout.service";
import { UserModule } from "../users/user.module";

@Module({
  imports: [
    PrismaModule,
    LoggerModule,
    PasswordModule,
    TokenModule,
    RedisModule,
    ConfigurationModule,
    EmailModule,
    UserModule,
  ],
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
