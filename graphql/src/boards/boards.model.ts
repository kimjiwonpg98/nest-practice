import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../users/user.model';

@ObjectType()
export class Board {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;
}
