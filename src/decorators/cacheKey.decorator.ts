import { SetMetadata } from '@nestjs/common';

export type CACHE_KEY = 'USER' | 'PRODUCT' | 'STORE';

export const CacheKey = (key: CACHE_KEY) => SetMetadata('cacheKey', key);
