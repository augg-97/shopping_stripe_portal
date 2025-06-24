import { Expose, Type } from 'class-transformer';

import { BaseDto } from '@dtos/base.dto';
import { BaseMediaDto } from '@dtos/media/baseMedia.dto';

export class BaseProductDto extends BaseDto {
  @Expose()
  name!: string;

  @Expose()
  description!: string;

  @Expose()
  info?: string;

  @Expose()
  stock!: number;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose()
  @Type(() => BaseMediaDto)
  media: BaseMediaDto[] = [];
}
