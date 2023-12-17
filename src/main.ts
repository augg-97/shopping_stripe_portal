import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigurationService } from "./config/configuration.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configurationService = app.get(ConfigurationService);

  const port = configurationService.port;
  await app.listen(port);
}
bootstrap();
