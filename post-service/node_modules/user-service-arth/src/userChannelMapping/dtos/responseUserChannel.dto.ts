import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@ObjectType()
export class UserChannelResponseDto {
  @Field(() => {
    return BigIntScalar;
  })
  id!: bigint;

  @Field(() => {
    return BigIntScalar;
  })
  userId!: bigint;

  @Field(() => {
    return BigIntScalar;
  })
  channelId!: bigint;
}
