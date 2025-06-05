import { Injectable } from '@nestjs/common';

import { RedisService } from '../services/redisService/redis.service';
import { REDIS_KEY } from '../services/redisService/redisKey';
import {
  UserIncludeType,
  UserRepository,
} from '../repositories/user.repository';
import { IUserDto } from '../dtos/users/user.interface';

@Injectable()
export class GetDataCacheService {
  constructor(
    private readonly redisService: RedisService,
    private readonly userRepository: UserRepository,
  ) {}

  async getUserData(
    userId: number,
  ): Promise<IUserDto | UserIncludeType | null> {
    const redisKey = `${REDIS_KEY.CACHE}_USER_${userId}`;
    const cacheData = await this.redisService.get(redisKey);

    if (cacheData) {
      return JSON.parse(cacheData);
    }

    return await this.userRepository.findUserById(userId);
  }

  isHasStore(user: IUserDto | UserIncludeType): boolean {
    if ('store' in user && user.store) {
      return true;
    }

    if ('stores' in user && user.stores && user.stores.length > 0) {
      return true;
    }

    return false;
  }
}
