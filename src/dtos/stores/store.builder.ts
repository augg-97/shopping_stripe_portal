import { Store } from '@prisma/client';
import { IStoreDto } from './store.interface';
import { IMediaDto } from '../media/media.interface';
import { IUserDto } from '../users/user.interface';

export class StoreDtoBuilder {
  protected storeDto: IStoreDto;

  constructor() {
    this.storeDto = <IStoreDto>{};
  }

  setDto(store: Store): this {
    this.storeDto = {
      ...this.storeDto,
      id: store.id,
      name: store.name,
      createdAt: store.createdAt.toISOString(),
      updatedAt: store.updatedAt.toISOString(),
    };

    return this;
  }

  setProfileImage(mediaDto: IMediaDto | null): this {
    this.storeDto = {
      ...this.storeDto,
      profileImage: mediaDto,
    };

    return this;
  }

  setCoverImage(mediaDto: IMediaDto | null): this {
    this.storeDto = {
      ...this.storeDto,
      coverImage: mediaDto,
    };

    return this;
  }

  setOwner(userDto: IUserDto): this {
    this.storeDto = {
      ...this.storeDto,
      owner: userDto,
    };

    return this;
  }

  toDto(): IStoreDto {
    return this.storeDto;
  }
}
