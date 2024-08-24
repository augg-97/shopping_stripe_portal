import { SetMetadata } from '@nestjs/common';
import { CACHE_EXPIRED } from '../helpers/constant';

export const CacheTTL = (time = CACHE_EXPIRED) => SetMetadata('cacheTTL', time);
