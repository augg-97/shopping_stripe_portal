import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { RedisService } from '../services/redisService/redis.service';
import { Observable, map, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { REDIS_KEY } from '../services/redisService/redisKey';
import { CACHE_KEY } from '../decorators/cacheKey.decorator';
import { Request } from 'express';
import { AuthUser } from '../services/tokenService/authUser';

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
    const cacheKey = this.reflector.get<CACHE_KEY | undefined>(
      'cacheKey',
      context.getHandler(),
    );

    if (!cacheKey) {
      return next.handle();
    }

    const req = context.switchToHttp().getRequest<Request>();

    const identifyCacheKey = this.reflector.get<string | undefined>(
      'identifyCacheKey',
      context.getHandler(),
    );

    const redisKey = this.buildCacheKey(
      cacheKey,
      identifyCacheKey,
      req.user,
      req.params.id,
    );
    const cacheData = await this.redisService.get(redisKey);

    if (cacheData) {
      return next.handle().pipe(map(() => JSON.parse(cacheData)));
    }

    return next.handle().pipe(
      tap(async (data) => {
        const cacheTTL = this.reflector.get<number | undefined>(
          'cacheTTL',
          context.getHandler,
        );
        await this.redisService.set(redisKey, JSON.stringify(data), cacheTTL);
      }),
    );
  }

  buildCacheKey(
    cacheKey: CACHE_KEY,
    identifyCacheKey?: string,
    user?: AuthUser,
    paramId?: string,
  ) {
    const isCacheKeyFromUserId =
      identifyCacheKey && identifyCacheKey === 'USER' && user;
    if (isCacheKeyFromUserId) {
      return `${REDIS_KEY.CACHE}_${cacheKey}_${user.id}`;
    }

    if (!paramId) {
      return `${REDIS_KEY.CACHE}_${cacheKey}`;
    }

    return `${REDIS_KEY.CACHE}_${cacheKey}_${paramId}`;
  }
}
