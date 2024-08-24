import { Module } from '@nestjs/common';
import { StoreRepository } from './store.repository';
import { StoreController } from './store.controller';
import { CreateStoreService } from './createStore/createStore.service';
import { GetDataCacheService } from '../../guards/getDataCache.service';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [],
  controllers: [StoreController],
  providers: [
    StoreRepository,
    UserRepository,
    CreateStoreService,
    GetDataCacheService,
  ],
  exports: [],
})
export class StoreModule {}
