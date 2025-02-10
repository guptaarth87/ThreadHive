import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';
import {
  IsNotEmpty,
  IsString,
  MinLength,

} from 'class-validator';
@ObjectType()
export class ReplyResponseDto {
  @Field(() => BigIntScalar)
  id!: bigint;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description!: string;

  @Field(() => BigIntScalar)
  modifiedBy!: bigint;

  @Field(() => BigIntScalar)
  createdBy!: bigint;

  @Field(() => BigIntScalar)
  channelId!: bigint;

  @Field(() => BigIntScalar)
  commentId!: bigint;

  @Field(() => BigIntScalar)
  postId!: bigint;

  @Field()
  createdAt!: Date;

  @Field({ nullable: true })
  modifiedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field()
  isDeleted!: boolean;
}
