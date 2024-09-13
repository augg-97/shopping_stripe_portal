import { Media, Product } from '@prisma/client';
import { MediaDto } from './media.dto';
import { Exclude, Expose, plainToClass, Transform } from 'class-transformer';
import { AbstractDto } from './abstract.dto';
import { UserDto } from './user.dto';
import { StoreDto } from './store.dto';
import { Decimal } from '@prisma/client/runtime/library';

export class ProductDto extends AbstractDto implements Product {
  name: string;

  description: string;

  info: string | null;

  @Expose()
  @Transform(({ obj }) => {
    if (obj.price instanceof Decimal) {
      return obj.price.toFixed(2);
    }
    return obj.price;
  })
  cost: string;

  stock: number;

  @Expose()
  @Transform(({ obj }) => plainToClass(UserDto, obj.createdBy))
  createdBy: UserDto | null;

  @Expose()
  @Transform(({ obj }) => plainToClass(StoreDto, obj.store))
  store: StoreDto | null;

  @Expose()
  @Transform(({ obj }) => {
    if (!obj.media || obj.media.length === 0) {
      return [];
    }
    return obj.media.map((item: Media) => plainToClass(MediaDto, item));
  })
  media: MediaDto[];

  @Exclude()
  price: Decimal;

  @Exclude()
  createdUser: number;

  @Exclude()
  storeId: number;
}
