import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigurationService } from "src/config/configuration.service";
import { RedisService } from "../redisService/redis.service";
import { IAuthUser, TOKEN_INFO, TokenInfo } from "./authUser.interface";
import { REDIS_KEY } from "../redisService/redisKey";
import { JwtPayload } from "jsonwebtoken";
import { TokenInvalidException } from "src/exceptions/unauthorized/tokenInvalid.exception";
import { AccessTokenExpiredException } from "src/exceptions/unauthorized/accessTokenExpired.exception";

// @Injectable()
// export class TokenService {
//   private accessTokenKey: string;
//   private accessTokenExpiredIn: number;
//   private refreshTokenKey: string;
//   private refreshTokenExpiredIn: number;

//   constructor(
//     private jwtService: JwtService,
//     private configurationService: ConfigurationService,
//     private redisService: RedisService,
//   ) {
//     this.accessTokenKey = this.configurationService.accessTokenKey;
//     this.accessTokenExpiredIn = this.configurationService.accessTokenExpiredIn;
//     this.refreshTokenKey = this.configurationService.refreshTokenKey;
//     this.refreshTokenExpiredIn =
//       this.configurationService.refreshTokenExpiredIn;
//   }

//   private async tokenGenerator(
//     payload: IAuthUser,
//     secret: string,
//     expiresIn: number,
//   ) {
//     return await this.jwtService.signAsync(payload, {
//       secret,
//       expiresIn,
//     });
//   }

//   private async storeToken(
//     token: string,
//     expiresIn: number,
//     key: REDIS_KEY,
//     id: string,
//   ) {
//     const redisKey = this.redisService.genRedisKey(key, id);
//     const getTokenByRedis = await this.redisService.get(redisKey);
//     if (getTokenByRedis) {
//       await this.redisService.delete(redisKey);
//     }

//     await this.redisService.set(redisKey, token, expiresIn);
//   }

//   private async verifyToken(
//     token: string,
//     secret: string,
//     key: REDIS_KEY,
//     id: string,
//   ) {
//     const redisKey = this.redisService.genRedisKey(key, id);
//     const getTokenByRedis = await this.redisService.get(redisKey);

//     // if (!getTokenByRedis) {
//     //   throw new
//     // }
//     // try {

//     // }
//   }

//   async accessTokenGenerator(payload: IAuthUser) {
//     const token = await this.tokenGenerator(
//       payload,
//       this.accessTokenKey,
//       this.accessTokenExpiredIn,
//     );

//     await this.storeToken(
//       token,
//       this.accessTokenExpiredIn,
//       REDIS_KEY.ACCESS_TOKEN,
//       payload.id,
//     );

//     return token;
//   }

//   async refreshTokenGenerator(payload: IAuthUser) {
//     const token = await this.tokenGenerator(
//       payload,
//       this.refreshTokenKey,
//       this.refreshTokenExpiredIn,
//     );
//     await this.storeToken(
//       token,
//       this.refreshTokenExpiredIn,
//       REDIS_KEY.REFRESH_TOKEN,
//       payload.id,
//     );

//     return token;
//   }
// }

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_INFO) private tokenInfo: TokenInfo,
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {}

  async tokenGenerator(payload: IAuthUser, clientId?: string) {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.tokenInfo.secretKey,
      expiresIn: this.tokenInfo.expiration,
    });

    const redisKey = clientId
      ? `${this.tokenInfo.redisKey}_${payload.id}_${clientId}`
      : `${this.tokenInfo.redisKey}_${payload.id}`;

    if (!clientId) {
      await this.redisService.rPush(redisKey, JSON.stringify({ token }));
      return token;
    }

    const getTokens = await this.redisService.lRange(redisKey);
    const tokens = getTokens.map((item) => JSON.parse(item));
    const hasToken = tokens.find(
      (item) => item.clientId && item.clientId === clientId,
    );

    if (hasToken) {
      await this.redisService.lRem(redisKey, JSON.stringify(hasToken));
    }

    await this.redisService.rPush(
      redisKey,
      JSON.stringify({ token, clientId }),
    );

    return token;
  }

  async tokenVerify(token: string, clientId?: string) {
    try {
      const payload = await this.jwtService.verifyAsync<IAuthUser & JwtPayload>(
        token,
        {
          secret: this.tokenInfo.secretKey,
        },
      );

      const authUser: IAuthUser = {
        id: payload.id,
        email: payload.email,
      };

      const redisKey = `${this.tokenInfo.redisKey}_${authUser.id}`;
      const getTokens = await this.redisService.lRange(redisKey);
      const tokens = getTokens.map((item) => JSON.parse(item));
      const hasToken = tokens.find(
        (item) =>
          item.token && item.token === token && item?.clientId === clientId,
      );

      if (!hasToken) {
        throw new TokenInvalidException();
      }

      return authUser;
    } catch (error) {
      if (error instanceof Error && error.name === "TokenExpiredError") {
        throw new AccessTokenExpiredException();
      }

      throw new TokenInvalidException();
    }
  }
}
