import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  nickname: string;

  @Field()
  name: string;

  @Field()
  number: string;
}
