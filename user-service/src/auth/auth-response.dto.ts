import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Payload {
  @Field()
  email!: string;

  @Field()
  role!: string;

  @Field()
  sub!: string; // Ensure BigInt is converted to a string before use
}


@ObjectType()
export class AuthResponse {
  @Field()
  access_token!: string;

  @Field(() => Payload) // ✅ Correctly linking Payload type
  payload!: Payload;
}

