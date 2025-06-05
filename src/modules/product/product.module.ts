import { Module } from '@nestjs/common';

import { GetDataCacheService } from '@guards/getDataCache.service';

import { ProductController } from './product.controller';
import { CreateProductService } from './createProduct/createProduct.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [CreateProductService, GetDataCacheService],
  exports: [],
})
export class ProductModule {}
