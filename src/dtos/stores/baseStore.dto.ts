import { Expose, Type } from 'class-transformer';

import { BaseMediaDto } from '@dtos/media/baseMedia.dto';
import { BaseDto } from '@dtos/base.dto';

export class BaseStoreDto extends BaseDto {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => BaseMediaDto)
  profileImage!: BaseMediaDto | null;

  @Expose()
  @Type(() => BaseMediaDto)
  coverImage!: BaseMediaDto | null;
}
