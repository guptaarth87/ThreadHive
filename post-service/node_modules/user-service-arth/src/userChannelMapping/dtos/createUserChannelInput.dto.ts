import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@InputType()
export class CreateUserChannelInput {
  @Field(() => {
    return BigIntScalar;
  })
  userId!: bigint;

  @Field(() => {
    return BigIntScalar;
  })
  channelId!: bigint;
}
