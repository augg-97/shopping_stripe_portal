import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "./decorators/allowAnonymous.decorator";

@ApiTags("root")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get("ping")
  ping() {
    return this.appService.ping();
  }
}
