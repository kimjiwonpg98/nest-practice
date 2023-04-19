import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { BoardModule } from '../boards/board.module';
import { UserLoader } from './user.loader';

@Module({
  imports: [BoardModule],
  providers: [UserResolver, UserService, PrismaService, UserLoader],
})
export class UserModule {}
