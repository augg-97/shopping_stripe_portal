import { Injectable } from '@nestjs/common';

import { AuthUser } from '@services/tokenService/authUser';
import { ConflictException } from '@exceptions/conflict/conflict.exception';
import { ProductRepository } from '@repositories/product.repository';
import { IProductDto } from '@dtos/products/product.interface';

import { CreateProductPayload } from './createProduct.payload';

@Injectable()
export class CreateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    authUser: AuthUser,
    payload: CreateProductPayload,
  ): Promise<IProductDto> {
    const product = await this.productRepository.create({
      name: payload.name,
      description: payload.description,
      price: payload.price,
      stock: payload.stock,
      store: {
        connect: {
          id: authUser.storeId,
        },
      },
      createdBy: {
        connect: {
          id: Number(authUser.id),
        },
      },
    });

    if (!product) {
      throw new ConflictException(
        'CREATE_PRODUCT_ERROR',
        'Unable to create product at this time',
      );
    }

    return {} as IProductDto;
  }
}
