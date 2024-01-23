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

    encryptionPrivateKey:
      process.env.ENCRYPTION_PRIVATE_KEY ||
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+NUz5QF4Cju+f2wkLU4qMhRE4JDyv2Th7cDU4C81+W4Z5CfX50oWtR0KMhetLZXQVoDvoH7lrFLkYsaKy5Lna2urh3olwSEJHXCKjQuvIeqHqkcI9p0xEhuqMf1u0NhNxo3MdcHsM6zd2qa1QoRcCddyHa6tOfD+TuGf+cByjyZXzBhPIpRQFVvRWMz7WY7nK40iQOlR1YuSAkeRf1AyuuagHW6vYly/FoHwJSosM7a2iDrFP/tlQ/eJJkI093vkpp8x8POrJz228i3Z9upW4QYIAJRcYJMzPsQFrwjMe0ADhwVJQiepzYegDDD/CnIyVML72hGd6os5D3+jN87ITAgMBAAECggEAOGhfLPX5S0Hvb1VKT9kVGAooaqFYe//r37ONnNLnPKdQ8FlTYKSdrx8YbcsTVfc+32D3EyZBWy+4msmnSe1J7s0IZjaURL+xJC9/ODKS8Q/pL8LNO3J/TD1Elqj4Xa/BwWwrKdpfK5wgBSlZtDUpuTmRznlQQsTXJ+xCrvK5k5qj9k0bk9tOpjyh/khuvR3D3IOHaSLqo6o931yuKKNRodjHDQVLWpzWOkn4pOEz/l21I+I1e0bmKV4Qi0Qd3f9psfHsLbGNbzwmJB9ZG1fY/aciJFeM2qmB59xnfx0em2/RuT4Zm4t0t0jw9EnEoe4naBuf9W0qPw2RtW1YHxe1iQKBgQDvL4w9kQtEstMqoY2ELk93PfrHZsA1E/tM5oXy3Fs1tsCDZrOBeTRnJ43QifR8PEa7DtPNOw81OEuwswH5dskNGGdRnJ+dTtOxDooOtLQEWHTG+KCYdg2ESIODVdMyDhVCTu6DWeE+vxJIt5uF1PQzk06qb/RGileSF7TKGdUNSwKBgQDLlFb+EaDMIlk2tbO8rYMvtFvvteWiMDP8FMzgbqJzzzHQ5ANGvT7Tqrwm6Yx8PRe7FMvSXa3FD9kmf+z786RdoTRi/CXnymAHTrHWmnvZ/X2Vh5c8Sm2TyWUL3czyFOtHwblRA1sKGMAUZuMrl3AgSUfCQQpu0gpu3TkD+OlZWQKBgQCt23zvv39WVznBEh8Ahn0Cqs2fpWNu8XBIDIQu7NdrqsQyfzNZmFVr6cdeXviUWWf8TiHMWvKJ97qk3OlBgINRfnyTSOqIeKTNXUkiuVzkj7uKaWyqhZz7m43kqDzUdIIlaaRbW7irWE2dB8EHPayn1Jporun7YFGZApxKDw7bEwKBgF+icPdrypD69dQIqcXR8RXA8Yt7dMOrR1B9aP1pm7ExvWI3Kv7ZOiFvTHIvNsrKXFKLY3CQh2hSmJ1IbUiy3R0K9LQnZZss682i/1IkQlhWh99t0fMFt9I8Qta/PF7gyuJrtCXFoMfudpVe/ArnWkoggrBTo5YJ39LS48zk6qIJAoGAH5TVV4ISlHYmC4iAeIKiDicplmWUbSpiG+QO7uSjLMaQxXxB0WXL0oSWQYyaV4QR8pKtig2j3bAfTtUQ0d2s3JA5nSg3q6QNOlIjFJbEzRjiShQzD3NFlAT1/WG6/1PQqAHGVrz22h9sHxIJjhi3qxtiwsDyJ+SQ17c5zVXVGXA=\n-----END PRIVATE KEY-----",
  };
};
