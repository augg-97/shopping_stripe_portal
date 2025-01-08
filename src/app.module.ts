import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './appConfigs/appConfig.module';
import { AppLoggerModule } from './services/appLoggerService/appLogger.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MediaModule } from './modules/media/media.module';
import { RedisModule } from './services/redisService/redis.module';
import { APP_FILTER, APP_GUARD, APP_PIPE, ModuleRef } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { TokenModule } from './services/tokenService/token.module';
import { TypeGuard } from './guards/type.guard';
import { StoreModule } from './modules/store/store.module';
import { ProductModule } from './modules/product/product.module';
import { PasswordModule } from './services/passwordService/password.module';
import { PrismaModule } from './services/prismaService/prisma.module';
import { UploadModule } from './services/uploadService/upload.module';
import { EmailModule } from './services/emailService/email.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { ClientIdMiddleware } from '@middlewares/clientId.middleware';
import { CorrelationMiddleware } from '@middlewares/correlation.middleware';
import { GlobalExceptionFilter } from '@exceptions/globalException.filter';
import { CustomValidationPipe } from 'pipes/customValidation.pipe';
import { useContainer } from 'class-validator';
import { AppLoggerService } from '@services/appLoggerService/appLogger.service';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    AppLoggerModule,
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
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: TypeGuard },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_PIPE, useClass: CustomValidationPipe },
    AppService,
  ],
  exports: [],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ClientIdMiddleware, CorrelationMiddleware).forRoutes('*');
  }

  onModuleInit(): void {
    useContainer(this.moduleRef.get(AppModule), { fallbackOnErrors: true });
  }
}
