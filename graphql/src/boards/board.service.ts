import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllBoard() {
    return await this.prisma.board.findMany({
      include: {
        user: true,
      },
    });
  }

  async getOneBoard(id: number) {
    return await this.prisma.board.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
  }

  async getBoardById(ids: number[]) {
    return await this.prisma.board.findMany({
      where: {
        user: {
          id: {
            in: ids,
          },
        },
      },
    });
  }
}
