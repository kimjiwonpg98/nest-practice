import { ObjectType, Field } from '@nestjs/graphql';
import { Board } from '../boards/boards.model';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  boards: Board;
}
