import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RegisterService } from "./register/register.service";
import { UserModule } from "../users/user.module";
import { PrismaModule } from "../../services/prismaService/prisma.module";
import { PasswordModule } from "../../services/passwordService/password.module";
import { ConfigurationModule } from "../../config/configuration.module";
import { PasswordValidatorRule } from "../../pipes/passwordDecrypt.pipe";

@Module({
  imports: [PrismaModule, UserModule, PasswordModule, ConfigurationModule],
  controllers: [AuthController],
  providers: [RegisterService, PasswordValidatorRule],
  exports: [],
})
export class AuthModule {}
