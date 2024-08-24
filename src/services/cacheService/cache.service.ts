import { Injectable } from '@nestjs/common';
import { RedisService } from '../redisService/redis.service';

@Injectable()
export class CacheService {
  constructor(private readonly redisService: RedisService) {}

  // async getCacheUser(userId: number): Promise<UserDto> {
  //   const cacheKey = `${REDIS_KEY.CACHE}_USER_${userId}`;
  // }
}
