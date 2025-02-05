import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service/dist'

@InputType()
export class UpdateReplyInput {
  @Field(() => BigIntScalar) // Assuming BigIntScalar is properly imported
  id!: bigint;
  
  @Field(()=>BigIntScalar)
  modifiedBy!: bigint 

  @Field()
  description!: string;

  @Field(() => BigIntScalar)
  channelId!: bigint;

  @Field(() => BigIntScalar)
  commentId!: bigint;

  @Field(() => BigIntScalar)
  postId!: bigint;

  @Field({ nullable: true })
  modifiedAt?: Date;
}