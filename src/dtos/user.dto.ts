import { Media, Store, USER_TYPE, User } from '@prisma/client';
import { AbstractDto } from './abstract.dto';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { MediaDto } from './media.dto';
import { StoreDto } from './store.dto';
import { EXPOSE_GROUP_PRIVATE } from '../helpers/constant';
import { UserIncludeType } from '../repositories/user.repository';

export class UserDto extends AbstractDto implements User {
  @Expose({ groups: [EXPOSE_GROUP_PRIVATE] })
  email: string;

  fullName: string;

  isVerify: boolean;

  @Expose({ groups: [EXPOSE_GROUP_PRIVATE] })
  type: USER_TYPE;

  @Expose()
  @Transform(({ value }) => plainToClass(MediaDto, value))
  profileImage: MediaDto | null;

  @Expose()
  @Transform(({ value }) => plainToClass(MediaDto, value))
  coverImage: MediaDto | null;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.stores && obj.stores.length > 0) {
      return plainToClass(StoreDto, obj.stores[0]);
    }
  })
  store: StoreDto | null;

  @Exclude()
  passwordHashed: string | null;

  @Exclude()
  salt: string | null;

  @Exclude()
  profileImageId: number | null;

  @Exclude()
  coverImageId: number | null;

  @Exclude()
  stores: StoreDto[];
}

export class IAbstractDto {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export class IMediaDto extends IAbstractDto {
  fileName: string;
  url: string;
}

export interface IStoreDto {
  name: string;
  profileImage?: IMediaDto | null;
  coverImage?: IMediaDto | null;
  owner?: IUserDto;
}

export interface IUserDto {
  email?: string;
  fullName: string;
  type?: USER_TYPE;
  isVerified: boolean;
  profileImage?: IMediaDto | null;
  coverImage?: IMediaDto | null;
  store?: IStoreDto | null;
}
