import { REDIS_KEY } from "../redisService/redisKey";

export interface IAuthUser {
  id: string;
  email: string;
}

export const TOKEN_INFO = "TOKEN_INFO";

export type TokenInfo = {
  redisKey: REDIS_KEY;
  secretKey: string;
  expiration: number;
  clientId: string;
};
