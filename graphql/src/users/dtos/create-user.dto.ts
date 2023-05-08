import { IsEmail, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;
}
