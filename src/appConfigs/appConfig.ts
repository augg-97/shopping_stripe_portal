export interface IAppConfig {
  nodeEnv: string;
  port: number;
  serviceName: string;

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

  otelCollectorGrpcUrl: string;

  sentryDsn: string;

  awsS3AccessKey: string;
  awsS3SecretKey: string;
}
