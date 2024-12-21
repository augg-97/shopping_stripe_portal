import { User } from '@prisma/client';
import { IUserDto } from './user.interface';
import { IMediaDto } from '../media/media.interface';
import { IStoreDto } from '../stores/store.interface';

export class UserDtoBuilder {
  protected userDto: IUserDto;

  constructor() {
    this.userDto = <IUserDto>{};
  }

  setPublicDto(user: User): this {
    this.userDto = {
      ...this.userDto,
      id: user.id,
      fullName: user.fullName,
      isVerified: user.isVerify,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return this;
  }

  setPrivateDto(user: User): this {
    this.userDto = {
      ...this.userDto,
      email: user.email,
      type: user.type,
    };

    return this;
  }

  setProfileImage(mediaDto: IMediaDto | null): this {
    this.userDto = {
      ...this.userDto,
      profileImage: mediaDto,
    };

    return this;
  }

  setCoverImage(mediaDto: IMediaDto | null): this {
    this.userDto = {
      ...this.userDto,
      coverImage: mediaDto,
    };

    return this;
  }

  setStore(storeDto: IStoreDto | null): this {
    this.userDto = {
      ...this.userDto,
      store: storeDto,
    };

    return this;
  }

  toDto(): IUserDto {
    return this.userDto;
  }
}
