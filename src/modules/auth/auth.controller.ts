import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegisterService } from './register/register.service';
import { RegisterPayload } from './register/register.payload';
import { TokenInterceptor } from '../../interceptors/token.interceptor';
import { LoginPayload } from './login/login.payload';
import { LoginService } from './login/login.service';
import { Request } from 'express';
import { RefreshTokenInterceptor } from '../../interceptors/refreshToken.interceptor';
import { RefreshTokenService } from './refreshToken/refreshToken.service';
import { RefreshTokenGuard } from '../../guards/refreshToken.guard';
import { ForgotPasswordPayload } from './forgotPassword/forgotPassword.payload';
import { ForgotPasswordService } from './forgotPassword/forgotPassword.service';
import { ResetPasswordPayload } from './resetPassword/resetPassword.payload';
import { ResetPasswordService } from './resetPassword/resetPassword.service';
import { VerifyEmailPayload } from './verifyEmail/verifyEmail.payload';
import { VerifyEmailService } from './verifyEmail/verifyEmail.service';
import { Public } from '../../decorators/allowAnonymous.decorator';
import { ResendVerifyEmailService } from './resendVerifyEmail/resendVerifyEmail.service';
import { LogoutService } from './logout/logout.service';
import { IUserDto } from '../../dtos/user.dto';

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
  @UseInterceptors(TokenInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() payload: RegisterPayload): Promise<IUserDto> {
    return await this.registerService.execute(payload);
  }

  @Public()
  @UseInterceptors(TokenInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() payload: LoginPayload) {
    return await this.loginService.execute(payload);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @UseInterceptors(RefreshTokenInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('token/refresh')
  async refreshToken(@Req() req: Request) {
    return await this.refreshTokenService.execute(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('password/reset')
  async resetPassword(@Body() payload: ResetPasswordPayload) {
    return await this.resetPasswordService.execute(payload);
  }

  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('password/forgot')
  async resetPasswordRequest(@Body() payload: ForgotPasswordPayload) {
    return await this.forgotPasswordService.execute(payload);
  }

  @Public()
  @UseInterceptors(TokenInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('email/verify')
  async verifyEmail(@Body() payload: VerifyEmailPayload) {
    return await this.verifyEmailService.execute(payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('email/verify/resend')
  async resendVerifyEmail(@Req() req: Request) {
    return await this.resendVerifyEmailService.execute(req.user);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@Req() req: Request, @Headers('client_id') clientId: string) {
    return await this.logoutService.execute(req.user, clientId);
  }
}
