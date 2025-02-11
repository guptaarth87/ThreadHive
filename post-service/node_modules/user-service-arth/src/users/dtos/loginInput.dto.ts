import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => {
    return String;
  })
  email!: string;

  @Field()
  password!: string;
}
