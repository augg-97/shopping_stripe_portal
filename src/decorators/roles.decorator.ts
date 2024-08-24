import { SetMetadata } from '@nestjs/common';
import { USER_TYPE } from '@prisma/client';

export const Roles = (roles: USER_TYPE[]) => SetMetadata('roles', roles);
