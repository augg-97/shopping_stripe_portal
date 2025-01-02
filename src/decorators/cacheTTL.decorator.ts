import { CACHE_EXPIRED } from '@helpers/constant';
import { SetMetadata } from '@nestjs/common';

export const CacheTTL = (time = CACHE_EXPIRED) => SetMetadata('cacheTTL', time);
