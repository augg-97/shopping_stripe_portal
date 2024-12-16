import { Media, Prisma, Store } from '@prisma/client';
import { OmitTyped } from '../utilities/customType.utilities';
import {
  ConcreteMediaDto,
  IConcreteMediaDto,
  IMediaDto,
  MediaDtoBuilder,
} from './media.dto';
import { AbsConcreteUserDto, IUserDto, UserDtoBuilder } from './user.dto';
import { AuthUser } from '../services/tokenService/authUser';

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

export interface IConcreteStoreDto {
  build(builder: StoreDtoBuilder): void;
}

export class ConcreteStoreDto implements IConcreteStoreDto {
  constructor(private readonly entity: OmitTyped<StoreEntity, 'owner'>) {}

  build(builder: StoreDtoBuilder): void {
    const profileImageDto =
      this.entity.profileImage &&
      this.buildMediaDto(new ConcreteMediaDto(this.entity.profileImage));
    const coverImageDto =
      this.entity.coverImage &&
      this.buildMediaDto(new ConcreteMediaDto(this.entity.coverImage));

    builder
      .setDto({ ...this.entity })
      .setProfileImage(profileImageDto)
      .setCoverImage(coverImageDto);
  }

  private buildMediaDto(concreteMediaDto: IConcreteMediaDto): IMediaDto {
    const builder = new MediaDtoBuilder();
    concreteMediaDto.build(builder);

    return builder.toDto();
  }
}

export class StoreProfileDto implements IConcreteStoreDto {
  constructor(
    private readonly userDto: AbsConcreteUserDto,
    private readonly storeDto: ConcreteStoreDto,
  ) {}

  build(builder: StoreDtoBuilder): void {
    this.storeDto.build(builder);

    const userDto = this.buildOwnerDto();
    builder.setOwner(userDto);
  }

  private buildOwnerDto(): IUserDto {
    const builder = new UserDtoBuilder();
    this.userDto.build(builder);

    return builder.toDto();
  }
}

export class StoreDto {
  constructor(private readonly entity: StoreEntity) {}

  toDto(authUser?: AuthUser): IStoreDto {
    return <IStoreDto>{};
  }
}
