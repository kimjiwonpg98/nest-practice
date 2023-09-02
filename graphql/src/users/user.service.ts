import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllUser() {
    return await this.usersRepository.find();
  }

  async getOneUser(id: string) {
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  async createUser(params: CreateUserDto) {
    const user = new User();
    user.name = params.name;
    user.email = params.email;
    const result = await this.usersRepository.insert(user);
    return result.raw.affectedRows;
  }

  async insertToken() {
    // ttl ms
    await this.cacheManager.set('key', 'vale', 5 * 60 * 1000);
  }
}
