import { IConfig } from "./config";

export const configuration = (): IConfig => {
  return {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 3001,

    saltRounds: Number(process.env.SALT_ROUNDS) || 10,
  };
};
