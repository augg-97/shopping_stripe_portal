import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RedisService } from "../redisService/redis.service";
import { AuthUser, TokenInfo } from "./authUser";
import { JwtPayload } from "jsonwebtoken";
import { TOKEN_INFO } from "../../helpers/constant";

@Injectable()
export class TokenService {
  constructor(
    @Inject(TOKEN_INFO) private tokenInfo: TokenInfo,
    private redisService: RedisService,
    private jwtService: JwtService,
  ) {}

  async tokenGenerator(payload: AuthUser, clientId?: string) {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.tokenInfo.secretKey,
      expiresIn: this.tokenInfo.expiration,
    });

    const redisKey = clientId
      ? `${this.tokenInfo.redisKey}_${payload.id}_${clientId}`
      : `${this.tokenInfo.redisKey}_${payload.id}`;

    const hasToken = await this.redisService.get(redisKey);
    if (hasToken) {
      await this.redisService.delete(redisKey);
    }

    await this.redisService.set(redisKey, token, this.tokenInfo.expiration);
    return token;
  }

  async tokenVerify(token: string, clientId?: string) {
    try {
      const payload = await this.jwtService.verifyAsync<AuthUser & JwtPayload>(
        token,
        {
          secret: this.tokenInfo.secretKey,
        },
      );

      const redisKey = clientId
        ? `${this.tokenInfo.redisKey}_${payload.id}_${clientId}`
        : `${this.tokenInfo.redisKey}_${payload.id}`;
      const getToken = await this.redisService.get(redisKey);

      if (!getToken) {
        throw this.tokenInfo.error;
      }

      return payload;
    } catch (error) {
      throw this.tokenInfo.error;
    }
  }
}
