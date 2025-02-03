import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@ObjectType()
export class PostResponseDto {
  @Field(() =>  BigIntScalar)
  id!: bigint;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(()=> BigIntScalar)
  modifiedBy! : bigint

  @Field(()=> BigIntScalar)
  createdBy!: bigint;

  @Field(()=> BigIntScalar)
  channelId!: bigint;

  @Field()
  createdAt!: Date;

  @Field({ nullable: true })
  modifiedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field()
  isDeleted!: boolean;
}