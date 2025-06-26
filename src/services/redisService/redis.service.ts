import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

import { AppConfigService } from '@appConfigs/appConfig.service';
import { AppLoggerService } from '@services/appLoggerService/appLogger.service';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  constructor(
    private readonly appConfig: AppConfigService,
    private readonly logger: AppLoggerService,
  ) {
    logger.serviceName = RedisService.name;
    this.client = new Redis({
      host: this.appConfig.redisHost,
      port: this.appConfig.redisPort,
      password: this.appConfig.redisPassword,
      lazyConnect: true,
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.client.connect();
      this.logger.log('Redis connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect to Redis', error);
      process.exit(1);
    }
  }

  buildCacheKey(redisKey: PREFIX_REDIS_KEY, ...args: string[]): string {
    return `${redisKey}:${args.join('_')}`;
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async setWithEX(
    key: string,
    value: string,
    expireTime: number,
  ): Promise<void> {
    await this.client.set(key, value, 'EX', expireTime);
  }

  async delete(key: string) {
    await this.client.del(key);
  }

  async lRange(key: string) {
    return await this.client.lrange(key, 0, -1);
  }

  async rPush(key: string, value: string) {
    await this.client.rpush(key, value);
  }

  async lRem(key: string, value: string) {
    await this.client.lrem(key, 0, value);
  }

  async hGet(key: string, field: string) {
    return await this.client.hget(key, field);
  }

  async hSet(key: string, field: string, value: string, expireTime?: number) {
    await this.client.hset(key, field, value);
  }
}
