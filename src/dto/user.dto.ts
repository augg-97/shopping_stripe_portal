import { Media, USER_ROLE, User } from "@prisma/client";
import { MediaDto } from "./media.dto";

export class UserDto {
  id: number;
  fullName: string;
  email?: string;
  role: USER_ROLE;
  isVerify: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage?: MediaDto;
  coverImage?: MediaDto;

  builder(
    user: User,
    profileImage: Media | null,
    coverImage: Media | null,
    authUserId?: number,
  ) {
    this.id = user.id;
    this.fullName = user.fullName;
    this.role = user.role;
    this.isVerify = user.isVerify;
    this.createdAt = user.createdAt.toISOString();
    this.updatedAt = user.updatedAt.toISOString();

    if (authUserId && user.id === authUserId) {
      this.email = user.email;
    }

    if (profileImage) {
      const mediaInstance = new MediaDto();
      mediaInstance.builder(profileImage);
      this.profileImage = mediaInstance.toResponse();
    }

    if (coverImage) {
      const mediaInstance = new MediaDto();
      mediaInstance.builder(coverImage);
      this.coverImage = mediaInstance.toResponse();
    }
  }

  toResponse(): UserDto {
    return { ...this };
  }
}
