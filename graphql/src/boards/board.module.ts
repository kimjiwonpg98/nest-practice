import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [BoardResolver, BoardService, PrismaService],
  exports: [BoardService],
})
export class BoardModule {}
