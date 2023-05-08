import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Board } from '../boards/board.entity';
import { BoardService } from '../boards/board.service';
import { UserLoader } from './user.loader';
import { CreateUserDto } from './dtos/create-user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService,
    private readonly userLoader: UserLoader,
  ) {}

  @Query(() => [User])
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Query(() => User)
  async getOneUser(@Args('id') id: number) {
    return await this.userService.getOneUser(id.toString());
  }

  @ResolveField(() => [Board])
  async boards(@Parent() user: User) {
    const { id } = user;
    return await this.userLoader.batchUsers.load(id);
  }

  @Mutation(() => Number)
  async createUser(@Args('createUserInput') body: CreateUserDto) {
    return await this.userService.createUser(body);
  }
}
