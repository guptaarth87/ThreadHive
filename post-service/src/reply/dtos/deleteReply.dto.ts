import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@InputType()
export class DeleteReplyInput {
  @Field(() => BigIntScalar)
  id!: bigint;
}
