import { Expose } from 'class-transformer';

import { BaseDto } from '@dtos/base.dto';

export class BaseMediaDto extends BaseDto {
  @Expose()
  fileName!: string;

  @Expose()
  url!: string;
}
