import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@InputType()
export class CreateUserChannelInput {
  @Field(() =>  BigIntScalar)
  userId!: bigint;

  @Field(() =>  BigIntScalar)
  channelId!: bigint;
}
