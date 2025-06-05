import { Global, Module, Provider } from '@nestjs/common';

import { MediaRepository } from './media.repository';
import { UserRepository } from './user.repository';
import { StoreRepository } from './store.repository';
import { ProductRepository } from './product.repository';

const services: Provider[] = [
  MediaRepository,
  UserRepository,
  StoreRepository,
  ProductRepository,
];

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: services,
  exports: services,
})
export class RepositoriesModule {}
