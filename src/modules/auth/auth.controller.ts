import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthUser } from '@services/tokenService/authUser';
import { AuthUserRequest } from '@decorators/authUserRequest.decorator';
import { Public } from '@decorators/allowAnonymous.decorator';
import { CacheKey } from '@decorators/cacheKey.decorator';
import { RefreshTokenGuard } from '@guards/refreshToken.guard';
import { CachingInterceptor } from '@interceptors/caching.interceptor';
import { RefreshTokenInterceptor } from '@interceptors/refreshToken.interceptor';
import { TokenInterceptor } from '@interceptors/token.interceptor';
import { UserIncludeType } from '@repositories/user.repository';
import { ResponseSerializerInterceptor } from '@interceptors/responseSerializer.interceptor';
import { UserDto } from '@dtos/users/user.dto';

import { ForgotPasswordPayload } from './forgotPassword/forgotPassword.payload';
import { ForgotPasswordService } from './forgotPassword/forgotPassword.service';
import { LoginPayload } from './login/login.payload';
import { LoginService } from './login/login.service';
import { LogoutService } from './logout/logout.service';
import { RefreshTokenService } from './refreshToken/refreshToken.service';
import { RegisterPayload } from './register/register.payload';
import { RegisterService } from './register/register.service';
import { ResendVerifyEmailService } from './resendVerifyEmail/resendVerifyEmail.service';
import { ResetPasswordPayload } from './resetPassword/resetPassword.payload';
import { ResetPasswordService } from './resetPassword/resetPassword.service';
import { VerifyEmailPayload } from './verifyEmail/verifyEmail.payload';
import { VerifyEmailService } from './verifyEmail/verifyEmail.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerService: RegisterService,
    private readonly loginService: LoginService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly verifyEmailService: VerifyEmailService,
    private readonly resendVerifyEmailService: ResendVerifyEmailService,
    private readonly logoutService: LogoutService,
  ) {}

  @Public()
  @UseInterceptors(TokenInterceptor, new ResponseSerializerInterceptor(UserDto))
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() payload: RegisterPayload): Promise<UserIncludeType> {
    return await this.registerService.execute(payload);
  }

  @Public()
  @UseInterceptors(
    TokenInterceptor,
    new ResponseSerializerInterceptor(UserDto),
    CachingInterceptor,
  )
  @CacheKey('USER')
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() payload: LoginPayload): Promise<UserIncludeType> {
    return await this.loginService.execute(payload);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @UseInterceptors(
    RefreshTokenInterceptor,
    new ResponseSerializerInterceptor(UserDto),
  )
  @HttpCode(HttpStatus.OK)
  @Post('token/refresh')
  async refreshToken(
    @AuthUserRequest('user') authUser: AuthUser,
  ): Promise<UserIncludeType> {
    return await this.refreshTokenService.execute(authUser);
  }

  @Public()
  @UseInterceptors(new ResponseSerializerInterceptor(UserDto))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('password/reset')
  async resetPassword(
    @Body() payload: ResetPasswordPayload,
  ): Promise<UserIncludeType> {
    return await this.resetPasswordService.execute(payload);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('password/forgot')
  async resetPasswordRequest(
    @Body() payload: ForgotPasswordPayload,
  ): Promise<void> {
    await this.forgotPasswordService.execute(payload);
  }

  @Public()
  @UseInterceptors(TokenInterceptor, new ResponseSerializerInterceptor(UserDto))
  @HttpCode(HttpStatus.OK)
  @Post('email/verify')
  async verifyEmail(
    @Body() payload: VerifyEmailPayload,
  ): Promise<UserIncludeType> {
    return await this.verifyEmailService.execute(payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('email/verify/resend')
  async resendVerifyEmail(
    @AuthUserRequest('user') authUser: AuthUser,
  ): Promise<void> {
    await this.resendVerifyEmailService.execute(authUser);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(
    @AuthUserRequest('user') authUser: AuthUser,
    @Headers('client_id') clientId: string,
  ): Promise<void> {
    await this.logoutService.execute(authUser, clientId);
  }
}
