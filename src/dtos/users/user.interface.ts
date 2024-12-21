import { Prisma, User, USER_TYPE } from '@prisma/client';
import { UserDtoBuilder } from './user.builder';
import { IMediaDto } from '../media/media.interface';
import { IStoreDto } from '../stores/store.interface';

const userInclude = Prisma.validator<Prisma.UserInclude>()({
  profileImage: true,
  coverImage: true,
  stores: {
    include: {
      profileImage: true,
      coverImage: true,
    },
  },
});

export type UserEntity = Prisma.UserGetPayload<{
  include: typeof userInclude;
}>;

export interface IUserDto extends Pick<User, 'id' | 'fullName'> {
  isVerified: boolean;
  email?: string;
  type?: USER_TYPE;
  createdAt: string;
  updatedAt: string;
  profileImage: IMediaDto | null;
  coverImage: IMediaDto | null;
  store?: IStoreDto | null;
}

export interface IUserDtoConcrete {
  builder: UserDtoBuilder;
  build(user: User): void;
}
