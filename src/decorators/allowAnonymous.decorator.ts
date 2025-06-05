import { SetMetadata } from '@nestjs/common';

import { DECORATOR } from './decorator.enum';

export const Public = (isPublic = true) =>
  SetMetadata(DECORATOR.IS_PUBLIC, isPublic);
