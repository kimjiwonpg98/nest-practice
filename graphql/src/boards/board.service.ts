import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async getAllBoard() {
    return await this.boardRepository.find({});
  }

  async getOneBoard(id: string) {
    return await this.boardRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getBoardById(ids: string[]) {
    return await this.boardRepository
      .createQueryBuilder('board')
      .whereInIds(ids)
      .innerJoinAndSelect('board.user', 'user')
      .getMany();
  }
}
