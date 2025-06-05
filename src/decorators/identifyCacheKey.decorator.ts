import { SetMetadata } from '@nestjs/common';

import { DECORATOR } from './decorator.enum';

export const IdentifyCacheKey = (entity = 'USER') =>
  SetMetadata(DECORATOR.IDENTIFY_CACHE_KEY, entity);
