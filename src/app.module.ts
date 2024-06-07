import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigurationModule } from "./config/configuration.module";
import { LoggerModule } from "./services/loggerService/logger.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/users/user.module";
import { MediaModule } from "./modules/media/media.module";
import { RedisModule } from "./services/redisService/redis.module";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";
import { TokenModule } from "./services/tokenService/token.module";
import { RoleGuard } from "./guards/role.guard";

@Module({
  imports: [
    ConfigurationModule,
    LoggerModule,
    RedisModule,
    TokenModule,
    AuthModule,
    UserModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    AppService,
  ],
  exports: [],
})
export class AppModule {}
