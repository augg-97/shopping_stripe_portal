import { Injectable } from '@nestjs/common';

import { AuthUser } from '@services/tokenService/authUser';
import { UserNotExistsException } from '@exceptions/badRequest/userNotExists.exception';
import { RedisService } from '@services/redisService/redis.service';
import { UserRepository } from '@repositories/user.repository';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

@Injectable()
export class LogoutService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly redisService: RedisService,
  ) {}

  async execute(authUser: AuthUser, clientId: string): Promise<void> {
    const { id } = authUser;

    const user = await this.userRepository.findUserById(Number(id));

    if (!user) {
      throw new UserNotExistsException();
    }

    const accessTokenRedisKey = clientId
      ? this.redisService.buildCacheKey(
          PREFIX_REDIS_KEY.ACCESS_TOKEN,
          `${user.id}`,
          clientId,
        )
      : this.redisService.buildCacheKey(
          PREFIX_REDIS_KEY.ACCESS_TOKEN,
          `${user.id}`,
        );
    await this.redisService.delete(accessTokenRedisKey);

    const refreshTokenRedisKey = clientId
      ? this.redisService.buildCacheKey(
          PREFIX_REDIS_KEY.REFRESH_TOKEN,
          `${user.id}`,
          clientId,
        )
      : this.redisService.buildCacheKey(
          PREFIX_REDIS_KEY.REFRESH_TOKEN,
          `${user.id}`,
        );
    await this.redisService.delete(refreshTokenRedisKey);
  }
}
