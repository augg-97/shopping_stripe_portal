import { Module } from "@nestjs/common";
import { PrismaModule } from "../../services/prismaService/prisma.module";
import { UserController } from "./user.controller";
import { GetMeService } from "./getMe/getMe.service";
import { GetUserByIdService } from "./getUserById/getUserById.service";
import { UserRepository } from "./user.repository";
import { LoggerModule } from "../../services/loggerService/logger.module";

@Module({
  imports: [PrismaModule, LoggerModule],
  controllers: [UserController],
  providers: [UserRepository, GetMeService, GetUserByIdService],
  exports: [UserRepository],
})
export class UserModule {}
