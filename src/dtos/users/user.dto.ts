import { Expose, Transform, Type } from 'class-transformer';

import { BaseStoreDto } from '@dtos/stores/baseStore.dto';

import { BaseUserDto } from './baseUser.dto';

export class UserDto extends BaseUserDto {
  @Expose()
  @Transform(({ obj: { stores } }) =>
    Array.isArray(stores) && stores.length > 0 ? stores[0] : null,
  )
  @Type(() => BaseStoreDto)
  store!: BaseStoreDto | null;
}
