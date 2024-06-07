import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import { LoggerService } from "./services/loggerService/logger.service";
import { correlationMiddleware } from "./middlewares/correlation.middleware";
import { clientIdMiddleware } from "./middlewares/clientId.middleware";
import { getValidatorError } from "./helpers/getValidatorErrorMessage";
import { ValidatorException } from "./exceptions/badRequest/validator.exception";
import { useContainer } from "class-validator";
import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./exceptions/globalException.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const setupApp = async (app: INestApplication) => {
  const loggerService = await app.resolve(LoggerService);
  app.use(correlationMiddleware(loggerService));
  app.use(clientIdMiddleware());

  app.enableCors({
    origin: "*",
    exposedHeaders: ["Authorization", "refresh_token", "correlationId"],
    methods: "GET, PUT, POST, DELETE, UPDATE, OPTIONS, PATCH",
    credentials: true,
  });

  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ["v1"],
    prefix: "",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      exceptionFactory(errors) {
        const message = getValidatorError(errors);
        throw new ValidatorException(message);
      },
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalFilters(new GlobalExceptionFilter(loggerService));

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Shopping stripe apis")
    .setDescription("Shopping stripe API document")
    .setVersion("v1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);
};
