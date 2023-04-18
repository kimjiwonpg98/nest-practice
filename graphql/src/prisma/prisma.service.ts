import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit
{
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
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
      ],
    });
  }

  private readonly logger = new Logger(PrismaService.name);
  async onModuleInit() {
    this.$on('query', (event) => {
      this.logger.log(event.query, event.duration);
    });

    this.$on('error', (event) => {
      this.logger.log(event.target);
    });

    await this.$connect();
  }
}
