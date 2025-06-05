import { Store } from '@prisma/client';

import { StoreDtoBuilder } from './store.builder';
import { IConcreteStoreDto } from './store.interface';

export class StoreDto implements IConcreteStoreDto {
  readonly builder: StoreDtoBuilder;

  constructor(_builder: StoreDtoBuilder) {
    this.builder = _builder;
  }

  build(store: Store): void {
    this.builder.setDto(store);
  }
}
