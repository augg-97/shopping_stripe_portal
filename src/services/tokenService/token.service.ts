import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigurationService } from "src/config/configuration.service";
import { RedisService } from "../redisService/redis.service";
import { IAuthUser } from "./authUser.interface";
import { REDIS_KEY } from "../redisService/redisKey";

@Injectable()
export class TokenService {
  private accessTokenKey: string;
  private accessTokenExpiredIn: number;
  private refreshTokenKey: string;
  private refreshTokenExpiredIn: number;

  constructor(
    private jwtService: JwtService,
    private configurationService: ConfigurationService,
    private redisService: RedisService,
  ) {
    this.accessTokenKey = this.configurationService.accessTokenKey;
    this.accessTokenExpiredIn = this.configurationService.accessTokenExpiredIn;
    this.refreshTokenKey = this.configurationService.refreshTokenKey;
    this.refreshTokenExpiredIn =
      this.configurationService.refreshTokenExpiredIn;
  }

  private async tokenGenerator(
    payload: IAuthUser,
    secret: string,
    expiresIn: number,
  ) {
    return await this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
  }

  private async storeToken(
    token: string,
    expiresIn: number,
    key: REDIS_KEY,
    id: string,
  ) {
    const redisKey = this.redisService.genRedisKey(key, id);
    const getTokenByRedis = await this.redisService.get(redisKey);
    if (getTokenByRedis) {
      await this.redisService.delete(redisKey);
    }

    await this.redisService.set(redisKey, token, expiresIn);
  }

  private async verifyToken(
    token: string,
    secret: string,
    key: REDIS_KEY,
    id: string,
  ) {
    const redisKey = this.redisService.genRedisKey(key, id);
    const getTokenByRedis = await this.redisService.get(redisKey);

    // if (!getTokenByRedis) {
    //   throw new
    // }
    // try {

    // }
  }

  async accessTokenGenerator(payload: IAuthUser) {
    const token = await this.tokenGenerator(
      payload,
      this.accessTokenKey,
      this.accessTokenExpiredIn,
    );

    await this.storeToken(
      token,
      this.accessTokenExpiredIn,
      REDIS_KEY.ACCESS_TOKEN,
      payload.id,
    );

    return token;
  }

  async refreshTokenGenerator(payload: IAuthUser) {
    const token = await this.tokenGenerator(
      payload,
      this.refreshTokenKey,
      this.refreshTokenExpiredIn,
    );
    await this.storeToken(
      token,
      this.refreshTokenExpiredIn,
      REDIS_KEY.REFRESH_TOKEN,
      payload.id,
    );

    return token;
  }
}
