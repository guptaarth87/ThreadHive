import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@InputType()
export class UpdateUserChannelInput {
  @Field(() => {
    return BigIntScalar;
  })
  id!: bigint;

  @Field(() => {
    return BigIntScalar;
  })
  userId?: bigint;

  @Field(() => {
    return BigIntScalar;
  })
  channelId?: bigint;

  @Field()
  modifiedAt?: Date;
}
