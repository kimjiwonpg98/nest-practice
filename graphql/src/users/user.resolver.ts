import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { Board } from '../boards/boards.model';
import { BoardService } from '../boards/board.service';
import { UserLoader } from './user.loader';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
    private readonly userLoader: UserLoader,
  ) {}

  @Query(() => [User])
  async getAllUser() {
    console.log('get all');
    return await this.userService.getAllUser();
  }

  @Query(() => User)
  async getOneUser(@Args('id') id: number) {
    return await this.userService.getOneUser(id);
  }

  @ResolveField(() => [Board])
  async boards(@Parent() user: User) {
    console.log(`posts(user: ${JSON.stringify(user)})`);
    const { id } = user;
    return this.userLoader.batchUsers.load(+id);
  }
}
