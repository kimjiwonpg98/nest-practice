import { Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { BoardService } from '../boards/board.service';

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  constructor(private boardService: BoardService) {}

  batchUsers = new DataLoader(async (userIds: number[]) => {
    const users = await this.boardService.getBoardById(userIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return userIds.map((userId) => usersMap.get(userId));
  });
}
