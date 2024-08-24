import { USER_TYPE } from '@prisma/client';
import { TokenExpiredException } from '../../exceptions/unauthorized/tokenExpired.exception';
import { REDIS_KEY } from '../redisService/redisKey';

export type AuthUser = {
  id: string;
  email: string;
  type: USER_TYPE;
  isVerify: boolean;
  storeId?: number;
};

export type TokenInfo = {
  redisKey: REDIS_KEY;
  secretKey: string;
  expiration: number;
  error: TokenExpiredException;
};
