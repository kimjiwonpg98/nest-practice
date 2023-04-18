import { Query, Resolver } from '@nestjs/graphql';
import { Board } from './boards.model';
import { BoardService } from './board.service';
import { User } from '../users/user.model';

@Resolver(() => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board])
  async getAllBoard() {
    return this.boardService.getAllBoard();
  }

  @Query(() => Board)
  async getOneBoard() {
    return await this.boardService.getOneBoard(1);
  }
}
