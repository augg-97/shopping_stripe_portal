import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { CACHE_KEY } from '@decorators/cacheKey.decorator';
import { DECORATOR } from '@decorators/decorator.enum';
import { RedisService } from '@services/redisService/redis.service';
import { PREFIX_REDIS_KEY } from '@constants/enums/prefixRedisKey.enum';

@Injectable()
export class CacheInterceptor<T> implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Promise<Observable<T>> {
    const { params } = context.switchToHttp().getRequest<Request>();
    const cacheKeyByDecoration = this.reflector.get<CACHE_KEY | undefined>(
      DECORATOR.CACHE_KEY,
      context.getHandler(),
    );

    if (!cacheKeyByDecoration || !params.id) {
      return next.handle();
    }

    const cacheKey = this.redisService.buildCacheKey(
      PREFIX_REDIS_KEY.CACHE,
      cacheKeyByDecoration,
    );
    const fieldKey = params.id;
    const cacheData = await this.redisService.hGet(cacheKey, fieldKey);
    if (cacheData) {
      return of(JSON.parse(cacheData));
    }

    return next.handle().pipe(
      tap(async (data) => {
        const cacheTTL = this.reflector.get<number | undefined>(
          'cacheTTL',
          context.getHandler(),
        );
        await this.redisService.hSet(
          cacheKey,
          fieldKey,
          JSON.stringify(data),
          cacheTTL,
        );
      }),
    );
  }
}
