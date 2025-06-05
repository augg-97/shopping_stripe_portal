import { SetMetadata } from '@nestjs/common';

import { DECORATOR } from './decorator.enum';

export type CACHE_KEY = 'USER' | 'PRODUCT' | 'STORE';

export const CacheKey = (key: CACHE_KEY) =>
  SetMetadata(DECORATOR.CACHE_KEY, key);
