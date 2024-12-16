import { Prisma, User, USER_TYPE } from '@prisma/client';
import {
  ConcreteMediaDto,
  IConcreteMediaDto,
  IMediaDto,
  MediaDtoBuilder,
} from './media.dto';
import {
  IStoreDto,
  StoreDtoBuilder,
  ConcreteStoreDto,
  IConcreteStoreDto,
} from './store.dto';
import { OmitTyped } from '../utilities/customType.utilities';
import { AuthUser } from '../services/tokenService/authUser';

const userEntity = Prisma.validator<Prisma.UserInclude>()({
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
  include: typeof userEntity;
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

export interface IConcreteUserDto {
  build(builder: UserDtoBuilder): void;
}

export abstract class AbsConcreteUserDto implements IConcreteUserDto {
  protected entity: OmitTyped<UserEntity, 'stores'>;

  abstract build(builder: UserDtoBuilder): void;

  protected buildMediaDto(concreteMediaDto: IConcreteMediaDto): IMediaDto {
    const builder = new MediaDtoBuilder();
    concreteMediaDto.build(builder);

    return builder.toDto();
  }
}

export class UserPrivateDto extends AbsConcreteUserDto {
  constructor(protected readonly entity: OmitTyped<UserEntity, 'stores'>) {
    super();
  }

  build(builder: UserDtoBuilder): void {
    const profileImageDto =
      this.entity.profileImage &&
      this.buildMediaDto(new ConcreteMediaDto(this.entity.profileImage));
    const coverImageDto =
      this.entity.coverImage &&
      this.buildMediaDto(new ConcreteMediaDto(this.entity.coverImage));

    builder
      .setPrivateDto({ ...this.entity })
      .setPublicDto({ ...this.entity })
      .setProfileImage(profileImageDto)
      .setCoverImage(coverImageDto);
  }
}

export class UserPublicDto extends AbsConcreteUserDto {
  constructor(protected readonly entity: OmitTyped<UserEntity, 'stores'>) {
    super();
  }

  build(builder: UserDtoBuilder): void {
    const profileImageDto =
      this.entity.profileImage &&
      this.buildMediaDto(new ConcreteMediaDto(this.entity.profileImage));
    const coverImageDto =
      this.entity.coverImage &&
      this.buildMediaDto(new ConcreteMediaDto(this.entity.coverImage));

    builder
      .setPublicDto({ ...this.entity })
      .setProfileImage(profileImageDto)
      .setCoverImage(coverImageDto);
  }
}

export class UserProfileDto implements IConcreteUserDto {
  constructor(
    private readonly userDto: AbsConcreteUserDto,
    private readonly entity: UserEntity,
  ) {}

  build(builder: UserDtoBuilder): void {
    const storeDto =
      this.entity.stores && this.entity.stores.length > 0
        ? this.buildStoreDto(new ConcreteStoreDto(this.entity.stores[0]))
        : null;

    this.userDto.build(builder);
    builder.setStore(storeDto);
  }

  private buildStoreDto(concreteStoreDto: IConcreteStoreDto): IStoreDto {
    const builder = new StoreDtoBuilder();
    concreteStoreDto.build(builder);

    return builder.toDto();
  }
}

export class UserDto {
  constructor(private readonly entity: UserEntity) {}

  toDto(authUser?: AuthUser): IUserDto {
    if (authUser && Number(authUser.id) === this.entity.id) {
      const concreteUserDto = new UserPrivateDto(this.entity);

      return this.buildDto(concreteUserDto);
    }

    const concreteUserDto = new UserPublicDto(this.entity);

    return this.buildDto(concreteUserDto);
  }

  private buildDto(concreteUserDto: AbsConcreteUserDto): IUserDto {
    const builder = new UserDtoBuilder();
    const userDto = new UserProfileDto(concreteUserDto, this.entity);
    userDto.build(builder);

    return builder.toDto();
  }
}
