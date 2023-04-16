import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';

export interface test {
  id: string;
  name: string;
  number: string;
  email: string;
  nickname: string;
}

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Query(() => User)
  async getOneUser() {
    return {
      id: '1',
      email: 'jiwonpg98@gmail.com',
      nickname: 'test',
      name: '김지원',
      number: '+82 10-1234-5678',
    };
  }
}
