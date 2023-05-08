import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Board } from './board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, User])],
  providers: [BoardResolver, BoardService],
  exports: [BoardService],
})
export class BoardModule {}
