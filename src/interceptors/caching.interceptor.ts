import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RedisService } from '../services/redisService/redis.service';
import { Observable, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { REDIS_KEY } from '../services/redisService/redisKey';
import { CACHE_KEY } from '../decorators/cacheKey.decorator';
import { IUserDto } from '../dtos/users/user.interface';
import { IStoreDto } from '../dtos/stores/store.interface';

@Injectable()
export class CachingInterceptor<T extends IUserDto | IStoreDto>
  implements NestInterceptor
{
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Promise<Observable<T>> {
    const cacheKey = this.reflector.get<CACHE_KEY | undefined>(
      'cacheKey',
      context.getHandler(),
    );

    if (!cacheKey) {
      return next.handle();
    }

    return next.handle().pipe(
      tap(async (data) => {
        const redisKey = Array.isArray(data)
          ? `${REDIS_KEY.CACHE}_${cacheKey}`
          : `${REDIS_KEY.CACHE}_${cacheKey}_${data.id}`;
        const cacheTTl = this.reflector.get<number | undefined>(
          'cacheTTL',
          context.getHandler(),
        );
        const cacheData = await this.redisService.get(redisKey);
        if (cacheData) {
          await this.redisService.delete(cacheData);
        }
        await this.redisService.set(redisKey, JSON.stringify(data), cacheTTl);
      }),
    );
  }
}
