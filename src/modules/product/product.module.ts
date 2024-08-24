import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { CreateProductService } from './createProduct/createProduct.service';
import { GetDataCacheService } from '../../guards/getDataCache.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    ProductRepository,
    CreateProductService,
    GetDataCacheService,
    UserRepository,
  ],
  exports: [],
})
export class ProductModule {}
