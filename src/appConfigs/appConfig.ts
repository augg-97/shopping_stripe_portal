export interface IAppConfig {
  nodeEnv: string;
  port: number;

  debugQuery: boolean;

  saltRounds: number;

  redisHost: string;
  redisPort: number;
  redisPassword: string;

  accessTokenKey: string;
  accessTokenExpiredIn: number;
  refreshTokenKey: string;
  refreshTokenExpiredIn: number;

  imageBaseUrl: string;

  emailServiceHost: string;
  emailServiceUserName: string;
  emailServicePassword: string;
  emailServicePort: number;
  emailServiceSender: string;

  resetPasswordUIUrl: string;
  verifyEmailUIUrl: string;
}
