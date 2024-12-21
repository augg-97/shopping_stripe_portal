import { OmitTyped } from '../../utilities/customType.utilities';
import { StoreDtoBuilder } from '../stores/store.builder';
import { IStoreDto, StoreEntity } from '../stores/store.interface';
import { StoreProfileDto } from '../stores/storeProfile.dto';
import { UserDtoBuilder } from './user.builder';
import { IUserDtoConcrete, UserEntity } from './user.interface';
import { UserProfileDto } from './userProfile.dto';

export class UserWithStoreDto
  extends UserProfileDto
  implements IUserDtoConcrete
{
  constructor(_builder: UserDtoBuilder, isPrivateUser = false) {
    super(_builder, isPrivateUser);
  }

  build(user: UserEntity): void {
    super.build(user);

    const storeDto =
      user.stores && user.stores.length > 0
        ? this.setStoreDto(user.stores[0])
        : null;
    this.builder.setStore(storeDto);
  }

  setStoreDto(store: OmitTyped<StoreEntity, 'owner'>): IStoreDto {
    const builder = new StoreDtoBuilder();
    const storeDto = new StoreProfileDto(builder);
    storeDto.build(store);

    return builder.toDto();
  }
}
