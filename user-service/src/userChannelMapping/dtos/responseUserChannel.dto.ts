import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@ObjectType()
export class UserChannelResponseDto {
  @Field(() => BigIntScalar)
  id!: bigint;

  @Field(() => BigIntScalar)
  userId!: bigint;

  @Field(() => BigIntScalar)
  channelId!: bigint;
}
