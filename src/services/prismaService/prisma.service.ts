import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ConfigurationService } from '../../config/configuration.service';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit
{
  constructor(private readonly configurationService: ConfigurationService) {
    super({
      log: configurationService.debugQuery
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
    if (this.configurationService.debugQuery) {
      this.$on('query', (e: Prisma.QueryEvent) => {
        console.log('Query: ' + e.query);
        console.log('Params: ' + e.params);
        console.log('Duration: ' + e.duration + 'ms');
      });
    }
    await this.$connect();
  }
}
