import { Injectable } from '@nestjs/common';

import { BadRequestException } from '@exceptions/badRequest/badRequest.exception';
import { RedisService } from '@services/redisService/redis.service';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

@Injectable()
export class ValidateEmailTokenService {
  constructor(private readonly redisService: RedisService) {}

  async execute(
    redisKey: PREFIX_REDIS_KEY,
    email: string,
    token: string,
  ): Promise<void> {
    const key = this.redisService.buildCacheKey(redisKey, email);
    const getToken = await this.redisService.get(key);

    if (!getToken) {
      throw new BadRequestException(
        'REQUEST_IS_EXPIRED',
        'Your reset password request is expired',
      );
    }

    if (getToken !== token) {
      throw new BadRequestException(
        'REQUEST_INVALID',
        'Your reset password request invalid',
      );
    }

    await this.redisService.delete(key);
  }
}
