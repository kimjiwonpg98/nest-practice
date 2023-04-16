import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  getAllUser(): User[] {
    return [
      {
        id: '1',
        email: 'jiwonpg98@gmail.com',
        nickname: 'test',
        name: '김지원',
        number: '+82 10-1234-5678',
      },
      {
        id: '1',
        email: 'jiwonpg98@gmail.com',
        nickname: 'test2',
        name: '김지원2',
        number: '+82 10-1234-5679',
      },
    ];
  }
}
