import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Payload {
  @Field()
  email!: string;

  @Field()
  role!: string;

  @Field()
  sub!: string; // Ensure Bigint is converted to a string before use
}

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken!: string;

  @Field(() => {
    return Payload;
  }) // ✅ Correctly linking Payload type
  payload!: Payload;
}
