import { Expose, Transform, Type } from 'class-transformer';

import { BaseUserDto } from '@dtos/users/baseUser.dto';

import { BaseStoreDto } from './baseStore.dto';

export class StoreDto extends BaseStoreDto {
  @Expose()
  @Transform(({ obj: { createdBy } }) => createdBy || null)
  @Type(() => BaseUserDto)
  owner!: BaseUserDto | null;
}
