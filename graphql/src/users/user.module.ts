import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { BoardModule } from '../boards/board.module';
import { UserLoader } from './user.loader';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forFeature([User]),
    CacheModule.register({}),
  ],
  providers: [UserResolver, UserService, UserLoader],
})
export class UserModule {}
