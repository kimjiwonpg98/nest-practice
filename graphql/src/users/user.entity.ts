import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../boards/board.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('user')
export class User {
  @Field()
  @PrimaryGeneratedColumn({})
  id: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 36,
  })
  name: string;

  @Field()
  @Column({
    type: 'varchar',
    length: 200,
  })
  email: string;

  @OneToMany(() => Board, (board) => board.user)
  board: Board[];

  @Field(() => Board, { nullable: true })
  boards?: Board;
}
