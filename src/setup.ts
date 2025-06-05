import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfigService } from '@appConfigs/appConfig.service';
import { AppLoggerService } from '@services/appLoggerService/appLogger.service';

export const setupApp = async (app: INestApplication): Promise<void> => {
  app.enableCors({
    origin: '*',
    exposedHeaders: [
      'Authorization',
      'refresh-token',
      'correlation-id',
      'client-id',
    ],
    methods: 'GET, PUT, POST, DELETE, UPDATE, OPTIONS, PATCH',
    credentials: true,
  });

  const logger = await app.resolve(AppLoggerService);
  app.useLogger(logger);

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['v1'],
    prefix: '',
  });

  const appConfigService = app.get(AppConfigService);

  // Swagger
  if (appConfigService.nodeEnv === 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Shopping stripe apis')
      .setDescription('Shopping stripe API document')
      .setVersion('v1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);
  }
};
