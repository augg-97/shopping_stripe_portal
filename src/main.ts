import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigurationService } from "./config/configuration.service";
import { setupApp } from "./setup";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await setupApp(app);

  const configurationService = app.get(ConfigurationService);
  const port = configurationService.port;
  await app.listen(port);
}
bootstrap();
