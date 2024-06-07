import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ConfigurationModule } from "../../config/configuration.module";

@Module({
  imports: [ConfigurationModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
