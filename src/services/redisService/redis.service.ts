import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private redisClient: RedisClientType) {}

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string, expireTime?: number) {
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
}
