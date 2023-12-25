import { REDIS_KEY } from "../redisService/redisKey";

export interface IAuthUser {
  id: string;
  email: string;
}

export const MODULE_TOKEN = "MODULE_TOKEN";

export type TokenInfo = {
  redisKey: REDIS_KEY;
  key: string;
  expiration: number;
};
