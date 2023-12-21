import { IConfig } from "./config";

export const configuration = (): IConfig => {
  return {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 3001,

    saltRounds: Number(process.env.SALT_ROUNDS) || 10,

    redisHost: process.env.REDIS_HOST || "localhost",
    redisPort: Number(process.env.REDIS_PORT) || 6379,

    accessTokenKey:
      process.env.ACCESS_TOKEN_KEY || "shoppingStripeDevAccessJwtKey",
    accessTokenExpiredIn: Number(process.env.ACCESS_TOKEN_EXPIRED_IN) || 1800,
    refreshTokenKey:
      process.env.REFRESH_TOKEN_KEY || "shoppingStripeDevRefreshJwtKey",
    refreshTokenExpiredIn:
      Number(process.env.REFRESH_TOKEN_EXPIRED_IN) || 1296000,
  };
};
