import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../services/prismaService/prisma.service';
import { AppLoggerService } from '../services/appLoggerService/appLogger.service';

export const storeInclude = Prisma.validator<Prisma.StoreInclude>()({
  owner: {
    include: {
      profileImage: true,
      coverImage: true,
    },
  },
  profileImage: true,
  coverImage: true,
});

export type StoreIncludeType = Prisma.StoreGetPayload<{
  include: typeof storeInclude;
}>;

@Injectable()
export class StoreRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: AppLoggerService,
  ) {}

  async create(
    data: Prisma.StoreCreateInput,
  ): Promise<StoreIncludeType | null> {
    try {
      return await this.prismaService.store.create({
        data,
        include: storeInclude,
      });
    } catch (err) {
      this.logger.error('🚀 ~ StoreRepository ~ create ~ err:', err);

      return null;
    }
  }

  async update(
    id: number,
    data: Prisma.StoreUpdateInput,
  ): Promise<StoreIncludeType | null> {
    try {
      return await this.prismaService.store.update({
        data,
        where: {
          id,
        },
        include: storeInclude,
      });
    } catch (err) {
      this.logger.error('🚀 ~ StoreRepository ~ update ~ err:', err);

      return null;
    }
  }
}
