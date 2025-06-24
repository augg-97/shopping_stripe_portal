import { randomBytes } from 'crypto';

import { Injectable } from '@nestjs/common';

import { RedisService } from '@services/redisService/redis.service';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

export interface EmailUIUrlParams {
  emailUIUrl: string;
  key: PREFIX_REDIS_KEY;
  email: string;
  tokenExpired: number;
}

@Injectable()
export class EmailUIUrlService {
  constructor(private readonly redisService: RedisService) {}

  async execute(params: EmailUIUrlParams) {
    const { emailUIUrl, key, email, tokenExpired } = params;

    const redisKey = this.redisService.buildCacheKey(key, email);
    const token = randomBytes(24).toString('base64url');
    await this.storeToken(redisKey, token, tokenExpired);

    return `${emailUIUrl}?email=${email}&token=${token}`;
  }

  private async storeToken(
    redisKey: string,
    token: string,
    tokenExpired: number,
  ) {
    const getToken = await this.redisService.get(redisKey);

    if (getToken) {
      await this.redisService.delete(redisKey);
    }

    await this.redisService.setWithEX(redisKey, token, tokenExpired);
  }
}
