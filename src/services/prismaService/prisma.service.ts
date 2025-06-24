/* eslint-disable no-console */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { AppConfigService } from '@appConfigs/appConfig.service';
import { AppLoggerService } from '@services/appLoggerService/appLogger.service';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit
{
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly logger: AppLoggerService,
  ) {
    logger.serviceName = PrismaService.name;
    super({
      log: appConfigService.debugQuery
        ? [
            {
              emit: 'stdout',
              level: 'query',
            },
            {
              emit: 'stdout',
              level: 'error',
            },
            {
              emit: 'stdout',
              level: 'info',
            },
            {
              emit: 'stdout',
              level: 'warn',
            },
          ]
        : [],
    });
  }

  async onModuleInit(): Promise<void> {
    if (this.appConfigService.debugQuery) {
      this.$on('query', (e: Prisma.QueryEvent) => {
        console.log(`Query: ${e.query}`);
        console.log(`Params: ${e.params}`);
        console.log(`Duration: ${e.duration} ms`);
      });
    }

    try {
      await this.$connect();
      this.logger.log('Prisma connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect to Prisma', error);
      process.exit(1);
    }
  }
}
