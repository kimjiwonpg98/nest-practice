import { Args, Query, Resolver } from '@nestjs/graphql';
import { Board } from './board.entity';
import { BoardService } from './board.service';

@Resolver(() => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board])
  async getAllBoard() {
    console.log('get all board');
    return this.boardService.getAllBoard();
  }

  @Query(() => Board)
  async getOneBoard(@Args('id') id: string) {
    console.log('get one board');
    return await this.boardService.getOneBoard(id);
  }
}
