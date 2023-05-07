import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Board {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;
}
