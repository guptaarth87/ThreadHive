import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@InputType()
export class UpdateCommentInput {
  @Field(() => BigIntScalar) // Assuming BigIntScalar is properly imported
  id!: bigint;

  @Field(() => BigIntScalar)
  modifiedBy!: bigint;

  @Field()
  description!: string;

  @Field(() => BigIntScalar)
  channelId!: bigint;

  @Field(() => BigIntScalar)
  postId!: bigint;

  @Field({ nullable: true })
  modifiedAt?: Date;
}
