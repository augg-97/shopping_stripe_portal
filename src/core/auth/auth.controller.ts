import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RegisterService } from "./register/register.service";
import { RegisterPayload } from "./register/register.payload";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private registerService: RegisterService) {}

  @Post("register")
  @HttpCode(HttpStatus.OK)
  async register(@Body() payload: RegisterPayload) {
    return await this.registerService.execute(payload);
  }
}
