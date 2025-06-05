import { OmitTyped } from '../../utilities/customType.utilities';
import { UserDtoBuilder } from '../users/user.builder';
import { IUserDto, UserEntity } from '../users/user.interface';
import { UserProfileDto } from '../users/userProfile.dto';

import { StoreDtoBuilder } from './store.builder';
import { IConcreteStoreDto, StoreEntity } from './store.interface';
import { StoreProfileDto } from './storeProfile.dto';

export class StoreWithUserDto
  extends StoreProfileDto
  implements IConcreteStoreDto
{
  constructor(_builder: StoreDtoBuilder) {
    super(_builder);
  }

  build(store: StoreEntity, isPrivateUser = false): void {
    super.build(store);

    const userDto = this.setUserDto(store.owner, isPrivateUser);
    this.builder.setOwner(userDto);
  }

  setUserDto(
    user: OmitTyped<UserEntity, 'stores'>,
    isPrivateUser = false,
  ): IUserDto {
    const builder = new UserDtoBuilder();
    const userDto = new UserProfileDto(builder, isPrivateUser);
    userDto.build(user);

    return builder.toDto();
  }
}
