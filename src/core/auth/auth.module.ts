import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RegisterService } from "./register/register.service";
import { PrismaModule } from "src/services/prismaService/prisma.module";
import { UserModule } from "../users/user.module";
import { PasswordModule } from "src/services/passwordService/password.module";

@Module({
  imports: [PrismaModule, UserModule, PasswordModule],
  controllers: [AuthController],
  providers: [RegisterService],
  exports: [],
})
export class AuthModule {}
