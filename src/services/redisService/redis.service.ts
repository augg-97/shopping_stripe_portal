import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

import { REDIS_KEY } from './redisKey';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private redisClient: RedisClientType) {}

  buildCacheKey(redisKey: REDIS_KEY, ...args: string[]): string {
    return `${redisKey}:${args.join('_')}`;
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string, expireTime?: number): Promise<void> {
    await this.redisClient.set(key, value, {
      EX: expireTime,
    });
  }

  async delete(key: string) {
    await this.redisClient.del(key);
  }

  async lRange(key: string) {
    try {
      return await this.redisClient.lRange(key, 0, 1);
    } catch (error) {
      return [];
    }
  }

  async rPush(key: string, value: string) {
    await this.redisClient.rPush(key, value);
  }

  async lRem(key: string, value: string) {
    await this.redisClient.lRem(key, 0, value);
  }

  async hGet(key: string, field: string) {
    return await this.redisClient.hGet(key, field);
  }

  async hSet(key: string, field: string, value: string, expireTime?: number) {
    await this.redisClient.hSet(key, field, value);
    if (expireTime) {
      await this.redisClient.hExpire(key, field, expireTime);
    }
  }
}
