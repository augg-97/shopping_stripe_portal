import { Module } from "@nestjs/common";
import {
  MediaDtoBuilderService,
  UserDtoBuilderService,
} from "./userDtoBuilder/userDtoBuilder.service";

@Module({
  imports: [],
  controllers: [],
  providers: [UserDtoBuilderService, MediaDtoBuilderService],
  exports: [UserDtoBuilderService, MediaDtoBuilderService],
})
export class UserModule {}
