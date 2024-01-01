import { Controller, Get, Req } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@ApiTags("root")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Req() req: Request) {
    return this.appService.root();
  }

  @Get("ping")
  ping() {
    return this.appService.ping();
  }
}
