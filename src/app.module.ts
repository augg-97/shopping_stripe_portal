import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigurationModule } from "./config/configuration.module";
import { LoggerModule } from "./services/loggerService/logger.module";
import { PrismaModule } from "./services/prismaService/prisma.module";
import { AuthModule } from "./core/auth/auth.module";
import { TokenModule } from "./services/tokenService/token.module";
import { PasswordValidatorRule } from "./validators/Password.validator";

@Module({
  imports: [
    ConfigurationModule,
    LoggerModule,
    PrismaModule,
    AuthModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService, PasswordValidatorRule],
})
export class AppModule {}
