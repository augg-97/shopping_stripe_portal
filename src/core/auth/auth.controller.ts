import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RegisterService } from "./register/register.service";
import { RegisterPayload } from "./register/register.payload";
import { Request } from "express";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private registerService: RegisterService) {}

  @Post("register")
  @HttpCode(HttpStatus.OK)
  async register(@Body() payload: RegisterPayload) {
    return await this.registerService.execute(payload);
  }

  @Get("login")
  @HttpCode(HttpStatus.OK)
  login(@Req() req: Request) {
    return req.headers["user-agent"];
  }
}
