import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RegisterService } from "./register/register.service";
import { RegisterPayload } from "./register/register.payload";
import { Request } from "express";
import { PasswordValidatorRule } from "../../pipes/passwordDecrypt.pipe";
import { CredentialsBodyValidation } from "../../decorator/passwordTransform.decorator";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private registerService: RegisterService) {}

  @Post("register")
  @HttpCode(HttpStatus.OK)
  async register(@CredentialsBodyValidation() payload: RegisterPayload) {
    return payload;
    // return await this.registerService.execute(payload);
  }

  @Get("login")
  @HttpCode(HttpStatus.OK)
  login(@Req() req: Request) {
    return req.headers["user-agent"];
  }
}
