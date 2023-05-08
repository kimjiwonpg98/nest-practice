import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('board')
export class Board {
  @Field()
  @PrimaryGeneratedColumn({})
  id: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 36,
  })
  title: string;

  @Field()
  @Column({
    type: 'unsigned big int',
  })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn([{ name: 'user_id' }])
  user: User;
}
