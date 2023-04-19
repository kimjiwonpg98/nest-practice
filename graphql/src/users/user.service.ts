import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllUser() {
    return await this.prisma.user.findMany();
  }

  async getOneUser(userId: number) {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }
}
