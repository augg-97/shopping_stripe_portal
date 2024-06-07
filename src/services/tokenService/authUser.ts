import { USER_ROLE } from "@prisma/client";
import { TokenExpiredException } from "../../exceptions/unauthorized/tokenExpired.exception";
import { REDIS_KEY } from "../redisService/redisKey";

export type AuthUser = {
  id: string;
  email: string;
  role: USER_ROLE;
  isVerify: boolean;
};

export type TokenInfo = {
  redisKey: REDIS_KEY;
  secretKey: string;
  expiration: number;
  error: TokenExpiredException;
};
