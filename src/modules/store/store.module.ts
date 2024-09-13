import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { CreateStoreService } from './createStore/createStore.service';
import { GetDataCacheService } from '../../guards/getDataCache.service';

@Module({
  imports: [],
  controllers: [StoreController],
  providers: [CreateStoreService, GetDataCacheService],
  exports: [],
})
export class StoreModule {}
