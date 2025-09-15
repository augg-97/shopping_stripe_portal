import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from 'pipes/customValidation.pipe';
import { SentryModule } from '@sentry/nestjs/setup';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';

import { ClientIdMiddleware } from '@middlewares/clientId.middleware';
import { TraceIdMiddleware } from '@middlewares/traceId.middleware';
import { GlobalExceptionFilter } from '@exceptions/globalException.filter';
import { AppConfigModule } from '@appConfigs/appConfig.module';
import { AppLoggerModule } from '@services/appLoggerService/appLogger.module';
import { PrismaModule } from '@services/prismaService/prisma.module';
import { RedisModule } from '@services/redisService/redis.module';
import { TokenModule } from '@services/tokenService/token.module';
import { UploadModule } from '@services/uploadService/upload.module';
import { EmailModule } from '@services/emailService/email.module';
import { PasswordModule } from '@services/passwordService/password.module';
import { RepositoriesModule } from '@repositories/repositories.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { MediaModule } from '@modules/media/media.module';
import { StoreModule } from '@modules/store/store.module';
import { ProductModule } from '@modules/product/product.module';
import { TokenGuard } from '@guards/token.guard';
import { TypeGuard } from '@guards/type.guard';

@Module({
  imports: [
    SentryModule.forRoot(),
    AppConfigModule,
    AppLoggerModule,
    PrismaModule,
    RedisModule,
    TokenModule,
    UploadModule,
    EmailModule,
    PasswordModule,
    RepositoriesModule,
    AuthModule,
    UserModule,
    MediaModule,
    StoreModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: TokenGuard },
    { provide: APP_GUARD, useClass: TypeGuard },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_PIPE, useClass: CustomValidationPipe },
    AppService,
  ],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(ClientIdMiddleware, TraceIdMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
