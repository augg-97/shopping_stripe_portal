import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { RegisterService } from "./register/register.service";
import { PrismaModule } from "src/services/prismaService/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [RegisterService],
  exports: [],
})
export class AuthModule {}
