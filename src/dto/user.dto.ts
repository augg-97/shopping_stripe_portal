import { USER_TYPE, User } from '@prisma/client';
import { AbstractDto } from './abstract.dto';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { MediaDto } from './media.dto';
import { StoreDto } from './store.dto';
import { EXPOSE_GROUP_PRIVATE } from '../helpers/constant';

export class UserDto extends AbstractDto implements User {
  @Expose({ groups: ['private'] })
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
  @Transform(({ obj }) => plainToClass(StoreDto, obj.stores[0]))
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
