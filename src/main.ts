import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfigService } from './appConfigs/appConfig.service';
import { setupApp } from './setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  await setupApp(app);

  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.port;
  await app.listen(port);
}
bootstrap();
