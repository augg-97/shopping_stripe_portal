import { User } from '@prisma/client';
import { UserDtoBuilder } from './user.builder';
import { IUserDtoConcrete } from './user.interface';

export class UserPrivateDto implements IUserDtoConcrete {
  readonly builder: UserDtoBuilder;

  constructor(_builder: UserDtoBuilder) {
    this.builder = _builder;
  }

  build(user: User): void {
    this.builder.setPublicDto(user).setPrivateDto(user);
  }
}

export class UserPublicDto implements IUserDtoConcrete {
  readonly builder: UserDtoBuilder;

  constructor(builder: UserDtoBuilder) {
    this.builder = builder;
  }

  build(user: User): void {
    this.builder.setPublicDto(user);
  }
}

export class UserDto implements IUserDtoConcrete {
  private userDtoConcrete!: IUserDtoConcrete;
  readonly builder: UserDtoBuilder;

  constructor(_builder: UserDtoBuilder, isPrivateUser = false) {
    this.builder = _builder;
    this.createConcrete(isPrivateUser);
  }

  private createConcrete(isPrivateUser = false): void {
    this.userDtoConcrete = isPrivateUser
      ? new UserPrivateDto(this.builder)
      : new UserPublicDto(this.builder);
  }

  build(entity: User): void {
    this.userDtoConcrete.build(entity);
  }
}
