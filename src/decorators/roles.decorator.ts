import { SetMetadata } from '@nestjs/common';
import { USER_TYPE } from '@prisma/client';

import { DECORATOR } from './decorator.enum';

export const Roles = (roles: USER_TYPE[]) =>
  SetMetadata(DECORATOR.ROLES, roles);
