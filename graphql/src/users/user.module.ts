import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { BoardModule } from '../boards/board.module';
import { UserLoader } from './user.loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [BoardModule, TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, UserLoader],
})
export class UserModule {}
