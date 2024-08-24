import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { ValidatorException } from './exceptions/badRequest/validator.exception';
import { GlobalExceptionFilter } from './exceptions/globalException.filter';
import { getValidatorError } from './helpers/getValidatorErrorMessage';
import { clientIdMiddleware } from './middlewares/clientId.middleware';
import { correlationMiddleware } from './middlewares/correlation.middleware';
import { LoggerService } from './services/loggerService/logger.service';

export const setupApp = async (app: INestApplication): Promise<void> => {
  const loggerService = await app.resolve(LoggerService);
  app.use(correlationMiddleware(loggerService));
  app.use(clientIdMiddleware());

  app.enableCors({
    origin: '*',
    exposedHeaders: [
      'Authorization',
      'refresh_token',
      'correlationId',
      'client_id',
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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory(errors): void {
        const message = getValidatorError(errors);
        throw new ValidatorException(message);
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new GlobalExceptionFilter(loggerService));
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Shopping stripe apis')
    .setDescription('Shopping stripe API document')
    .setVersion('v1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);
};
