import { Expose, Type } from 'class-transformer';

import { StoreDto } from '@dtos/stores/store.dto';

import { BaseProductDto } from './baseProduct.dto';

export class ProductDto extends BaseProductDto {
  @Expose()
  @Type(() => StoreDto)
  store!: StoreDto | null;
}
