import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from 'app.module';

import { AppConfigService } from '@appConfigs/appConfig.service';

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

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['v1'],
    prefix: '',
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

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
