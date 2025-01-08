import { Injectable } from '@nestjs/common';
import { Media, Prisma } from '@prisma/client';
import { PrismaService } from '../services/prismaService/prisma.service';
import { AppLoggerService } from '../services/appLoggerService/appLogger.service';

export type MediaBulkInput = {
  fileName: string;
  url: string;
  uploaderId: number;
};

@Injectable()
export class MediaRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly logger: AppLoggerService,
  ) {}

  async createMedia(data: Prisma.MediaCreateInput) {
    try {
      return await this.prismaService.media.create({
        data,
      });
    } catch (err) {
      this.logger.error('🚀 ~ MediaRepository ~ createMedia ~ err:', err);

      return null;
    }
  }

  async createBulkMedia(data: MediaBulkInput[]) {
    const values = data.map(
      (item) => Prisma.sql`(${item.fileName}, ${item.url}, ${item.uploaderId})`,
    );

    const query = Prisma.sql`
      INSERT INTO "Media" ("fileName", "url", "uploaderId") VALUES
      ${Prisma.join(values)}
      RETURNING *;
    `;

    try {
      const media = await this.prismaService.$queryRaw<Media[]>(query);

      return media;
    } catch (err) {
      this.logger.error('🚀 ~ MediaRepository ~ createBulkMedia ~ err:', err);

      return [];
    }
  }
}
