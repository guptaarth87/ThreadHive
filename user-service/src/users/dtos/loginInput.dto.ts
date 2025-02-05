import { InputType, Field , registerEnumType} from '@nestjs/graphql';


@InputType()
export class LoginInput {
  @Field(() => String)
  email!: string;

  @Field()
  password!: string;
}