import { SetMetadata } from '@nestjs/common';

export const IdentifyCacheKey = (entity = 'USER') =>
  SetMetadata('identifyCacheKey', entity);
