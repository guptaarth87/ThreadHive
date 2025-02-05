import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service/dist'

@InputType()
export class CreateReplyInput {

  @Field()
  description!: string;

  @Field(() => BigIntScalar)
  createdBy!: bigint;

  @Field(() => BigIntScalar)
  channelId!: bigint;

  @Field(() => BigIntScalar)
  commentId!: bigint;

  @Field(() => BigIntScalar)
  postId!: bigint;
}