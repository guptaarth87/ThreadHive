import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';
import {
  IsNotEmpty,
  IsString,
  MinLength,

} from 'class-validator';

@InputType()
export class CreateReplyInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
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
