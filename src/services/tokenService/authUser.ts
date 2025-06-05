import { USER_TYPE } from '@prisma/client';

export interface AuthUser {
  id: string;
  email: string;
  type: USER_TYPE;
  isVerify: boolean;
  storeId?: number;
}
