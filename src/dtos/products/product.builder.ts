import { Product } from '@prisma/client';

import { IProductDto } from './product.interface';

export class ProductDtoBuilder {
  protected productDto: IProductDto;

  constructor() {
    this.productDto = {} as IProductDto;
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
