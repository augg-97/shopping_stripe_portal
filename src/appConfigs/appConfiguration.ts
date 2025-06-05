import { IAppConfig } from './appConfig';

export const appConfiguration = (): IAppConfig => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3001,

  debugQuery: Boolean(Number(process.env.DEBUG_QUERY)) || false,

  saltRounds: Number(process.env.SALT_ROUNDS) || 10,

  redisHost: process.env.REDIS_HOST ?? 'localhost',
  redisPort: Number(process.env.REDIS_PORT) || 6379,
  redisPassword: process.env.REDIS_PASSWORD ?? 'Password',

  accessTokenKey:
    process.env.ACCESS_TOKEN_KEY ?? 'shoppingStripeDevAccessJwtKey',
  accessTokenExpiredIn: Number(process.env.ACCESS_TOKEN_EXPIRED_IN) || 1800,
  refreshTokenKey:
    process.env.REFRESH_TOKEN_KEY ?? 'shoppingStripeDevRefreshJwtKey',
  refreshTokenExpiredIn:
    Number(process.env.REFRESH_TOKEN_EXPIRED_IN) || 1296000,

  imageBaseUrl:
    process.env.IMAGE_BASE_URL ?? 'http://localhost:8080/upload/images/',

  emailServiceHost: process.env.EMAIL_SERVICE_HOST ?? 'smtp.gmail.com',
  emailServiceUserName:
    process.env.EMAIL_SERVICE_USERNAME ?? 'hoangle9897@gmail.com',
  emailServicePassword: process.env.EMAIL_SERVICE_PASSWORD ?? '12345Hoang',
  emailServicePort: Number(process.env.EMAIL_SERVICE_PORT) || 587,
  emailServiceSender:
    process.env.EMAIL_SERVICE_SENDER ?? 'hoangle9897@gmail.com',

  resetPasswordUIUrl:
    process.env.RESET_PASSWORD_UI_URL ?? 'http://localhost:3000/reset-password',
  verifyEmailUIUrl:
    process.env.VERIFY_EMAIL_UI_URL ?? 'http://localhost:3000/email-verify',
});
