export interface IConfig {
  nodeEnv: string;
  port: number;

  saltRounds: number;

  redisHost: string;
  redisPort: number;

  accessTokenKey: string;
  accessTokenExpiredIn: number;
  refreshTokenKey: string;
  refreshTokenExpiredIn: number;
}
