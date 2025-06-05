import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { DECORATOR } from '@decorators/decorator.enum';

import { RedisService } from '../services/redisService/redis.service';
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
    return next.handle().pipe(
      tap(async (data) => {
        const cacheKeyByDecoration = this.reflector.get<CACHE_KEY | undefined>(
          DECORATOR.CACHE_KEY,
          context.getHandler(),
        );

        if (cacheKeyByDecoration) {
          const cacheKey = this.redisService.buildCacheKey(
            REDIS_KEY.CACHE,
            cacheKeyByDecoration,
          );
          const fieldKey = `${data.id}`;
          const cacheTTl = this.reflector.get<number | undefined>(
            'cacheTTL',
            context.getHandler(),
          );
          await this.redisService.hSet(
            cacheKey,
            fieldKey,
            JSON.stringify(data),
            cacheTTl,
          );
        }
      }),
    );
  }
}
