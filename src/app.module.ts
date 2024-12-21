import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './appConfigs/appConfig.module';
import { LoggerModule } from './services/loggerService/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MediaModule } from './modules/media/media.module';
import { RedisModule } from './services/redisService/redis.module';
import { APP_GUARD } from '@nestjs/core';
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

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    LoggerModule,
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
    AppService,
  ],
  exports: [],
})
export class AppModule {}
