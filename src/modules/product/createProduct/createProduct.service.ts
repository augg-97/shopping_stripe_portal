import { Injectable } from '@nestjs/common';
import { CreateProductPayload } from './createProduct.payload';
import { AuthUser } from '../../../services/tokenService/authUser';
import { ConflictException } from '../../../exceptions/conflict/conflict.exception';
import { ProductDto } from '../../../dtos/product.dto';
import { plainToClass } from 'class-transformer';
import { ProductRepository } from '../../../repositories/product.repository';

@Injectable()
export class CreateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(
    authUser: AuthUser,
    payload: CreateProductPayload,
  ): Promise<ProductDto> {
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

    return plainToClass(ProductDto, product);
  }
}
