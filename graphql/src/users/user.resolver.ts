import { Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

export interface test {
  id: string;
  name: string;
  number: string;
  email: string;
  nickname: string;
}

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [User])
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Query(() => User)
  async getOneUser() {
    return await this.prisma.user.findFirst({
      where: {
        id: 1,
      },
    });
  }
}
