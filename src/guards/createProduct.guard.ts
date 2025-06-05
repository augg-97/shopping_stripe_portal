import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

import { ForbiddenException } from '../exceptions/forbidden/forbidden.exception';

import { GetDataCacheService } from './getDataCache.service';

@Injectable()
export class CreateProductGuard implements CanActivate {
  constructor(private readonly getDataCacheService: GetDataCacheService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest<Request>();

    if (!user) {
      throw new ForbiddenException();
    }

    const userData = await this.getDataCacheService.getUserData(
      Number(user.id),
    );

    const isAllow = userData && this.getDataCacheService.isHasStore(userData);
    if (!isAllow) {
      throw new ForbiddenException();
    }

    return true;
  }
}
