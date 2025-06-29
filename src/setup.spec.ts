import { execSync } from 'child_process';
import { join } from 'path';

import { useContainer } from 'class-validator';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Reflector } from '@nestjs/core';

import { randomString } from './helpers/randomString';
import { ValidatorException } from './exceptions/badRequest/validator.exception';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './exceptions/globalException.filter';

export class SetupTest {
  private dbConfig = {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER ?? 'sps_db',
    password: process.env.POSTGRES_PASSWORD ?? 'bQ5UroNM9PqslBs',
  };
  private dbName: string;
  private url: string;
  private command = join(__dirname, '..', 'node_modules', '.bin', 'prisma');
  private prismaClientTest: PrismaClient;

  constructor() {
    this.dbName = `sps_db_test_${randomString(16)}`;
    this.url = this.generateDatabaseUrl();
    this.prismaClientTest = new PrismaClient({
      datasources: {
        db: { url: this.url },
      },
    });
  }

  private generateDatabaseUrl(): string {
    return `postgresql://${this.dbConfig.user}:${this.dbConfig.password}@${this.dbConfig.host}:${this.dbConfig.port.toString()}/${this.dbName}?schema=public`;
  }

  setup(): void {
    console.log('🚀 ~ generateDatabaseTest ~ url:', this.url);
    this.generateDatabaseTest();
  }

  async clearDatabaseTest(): Promise<void> {
    await this.prismaClientTest.$disconnect();
    execSync(
      `echo 'DROP DATABASE "${this.dbName}";' | ${this.command} db execute --stdin --url="$DATABASE_URL"`,
    );
  }

  private generateDatabaseTest(): void {
    execSync(`${this.command} db push --skip-generate`, {
      env: {
        ...process.env,
        DATABASE_URL: this.url,
      },
    });
  }
}

// export const setupTestApp = async (app: INestApplication): Promise<void> => {
//   const loggerService = await app.resolve(LoggerService);
//   app.use(correlationMiddleware(loggerService));
//   app.use(clientIdMiddleware());

//   app.enableCors({
//     origin: "*",
//     exposedHeaders: [
//       "Authorization",
//       "refresh_token",
//       "correlationId",
//       "client_id",
//     ],
//     methods: "GET, PUT, POST, DELETE, UPDATE, OPTIONS, PATCH",
//     credentials: true,
//   });

//   app.setGlobalPrefix("api");
//   app.enableVersioning({
//     type: VersioningType.URI,
//     defaultVersion: ["v1"],
//     prefix: "",
//   });
//   app.useGlobalPipes(
//     new ValidationPipe({
//       transform: true,
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       stopAtFirstError: true,
//       exceptionFactory(errors): void {
//         const message = getValidatorError(errors);
//         throw new ValidatorException(message);
//       },
//     }),
//   );
//   useContainer(app.select(AppModule), { fallbackOnErrors: true });
//   app.useGlobalFilters(new GlobalExceptionFilter(loggerService));
//   app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

//   const port = 3002;
//   await app.listen(port);
// };
