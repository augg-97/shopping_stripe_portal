// import './utilities/tracing.utilities';
import { NestFactory } from '@nestjs/core';

import { AppLoggerService } from '@services/appLoggerService/appLogger.service';

import { AppModule } from './app.module';
import { AppConfigService } from './appConfigs/appConfig.service';
import { setupApp } from './setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await setupApp(app);

  const appConfigService = app.get(AppConfigService);
  const port = appConfigService.port;
  const nodeEnv = appConfigService.nodeEnv;
  const logger = await app.resolve(AppLoggerService);
  await app.listen(port, () => {
    logger.log(
      `Server is running on ${nodeEnv.toUpperCase()} environment with http://localhost:${port}`,
    );
  });
}
bootstrap();
