import { Module } from '@nestjs/common';

import { GetDataCacheService } from '@guards/getDataCache.service';

import { StoreController } from './store.controller';
import { CreateStoreService } from './createStore/createStore.service';

@Module({
  imports: [],
  controllers: [StoreController],
  providers: [CreateStoreService, GetDataCacheService],
  exports: [],
})
export class StoreModule {}
