import { Product } from '@prisma/client';
import { IMediaDto } from './media.dto';
import { IStoreDto } from './store.dto';
import { Decimal } from '@prisma/client/runtime/library';

export interface IProductDto
  extends Pick<Product, 'id' | 'name' | 'description' | 'stock'> {
  info?: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  media?: IMediaDto[];
  store?: IStoreDto;
}

export class ProductDtoBuilder {
  protected productDto: IProductDto;

  constructor() {
    this.productDto = <IProductDto>{};
  }

  setDto(product: Product): this {
    this.productDto = {
      ...this.productDto,
      id: product.id,
      name: product.name,
    };

    return this;
  }
}
