import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";
import { PrismaModule } from "../../services/prismaService/prisma.module";
import { UploadModule } from "../../services/uploadService/upload.module";
import { LoggerModule } from "../../services/loggerService/logger.module";
import { TokenModule } from "../../services/tokenService/token.module";
import { MediaRepository } from "./media.repository";

@Module({
  imports: [PrismaModule, UploadModule, LoggerModule, TokenModule],
  controllers: [MediaController],
  providers: [MediaService, MediaRepository],
  exports: [],
})
export class MediaModule {}
