import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { GetMeService } from "./getMe/getMe.service";
import { Public } from "../../decorators/allowAnonymous.decorator";
import { GetUserByIdService } from "./getUserById/getUserById.service";

@ApiTags("users")
@Controller("users")
export class UserController {
  constructor(
    private readonly getMeService: GetMeService,
    private readonly getUserByIdService: GetUserByIdService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get("me")
  async getMe(@Req() req: Request) {
    return await this.getMeService.execute(req.user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get(":id")
  async getUserById(
    @Req() req: Request,
    @Param("id", ParseIntPipe) id: number,
  ) {
    if (req.user && Number(req.user.id) === id) {
      return await this.getMeService.execute(req.user);
    }
    return await this.getUserByIdService.execute(id);
  }
}
