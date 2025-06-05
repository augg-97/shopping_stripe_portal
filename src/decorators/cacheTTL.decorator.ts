import { SetMetadata } from '@nestjs/common';

import { CACHE_EXPIRED } from '@helpers/constant';

import { DECORATOR } from './decorator.enum';

export const CacheTTL = (time = CACHE_EXPIRED) =>
  SetMetadata(DECORATOR.CACHE_TTL, time);
