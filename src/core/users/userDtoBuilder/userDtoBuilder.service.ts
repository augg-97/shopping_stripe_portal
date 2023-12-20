import { Injectable } from "@nestjs/common";
import { Media } from "@prisma/client";
import { MediaDto, UserDBQuery, UserDto } from "./userDto.interface";

@Injectable()
export class MediaDtoBuilderService {
  execute(mediaDBQuery: Media): MediaDto {
    return {
      id: mediaDBQuery.id.toString(),
      code: mediaDBQuery.code,
      url: mediaDBQuery.url,
      createdAt: mediaDBQuery.createdAt.toISOString(),
      updatedAt: mediaDBQuery.updatedAt?.toISOString() || "",
    };
  }
}

@Injectable()
export class UserDtoBuilderService {
  constructor(private mediaDtoBuilderService: MediaDtoBuilderService) {}

  execute(userDBQuery: UserDBQuery): UserDto {
    return {
      id: userDBQuery.id.toString(),
      email: userDBQuery.email,
      fullName: userDBQuery.fullName,
      createdAt: userDBQuery.createdAt.toISOString(),
      updatedAt: userDBQuery.updatedAt?.toISOString() || "",
      profile: userDBQuery.profileImage
        ? this.mediaDtoBuilderService.execute(userDBQuery.profileImage)
        : null,
      cover: userDBQuery.coverImage
        ? this.mediaDtoBuilderService.execute(userDBQuery.coverImage)
        : null,
    };
  }
}
