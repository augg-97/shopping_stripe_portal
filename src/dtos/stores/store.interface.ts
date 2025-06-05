import { Prisma, Store } from '@prisma/client';

import { IMediaDto } from '../media/media.interface';
import { IUserDto } from '../users/user.interface';

import { StoreDtoBuilder } from './store.builder';

export const storeInclude = Prisma.validator<Prisma.StoreInclude>()({
  profileImage: true,
  coverImage: true,
  owner: {
    include: {
      profileImage: true,
      coverImage: true,
    },
  },
});

export type StoreEntity = Prisma.StoreGetPayload<{
  include: typeof storeInclude;
}>;

export interface IStoreDto extends Pick<Store, 'id' | 'name'> {
  createdAt: string;
  updatedAt: string;
  profileImage: IMediaDto | null;
  coverImage: IMediaDto | null;
  owner?: IUserDto;
}

export interface IConcreteStoreDto {
  builder: StoreDtoBuilder;
  build(store: Store): void;
}
