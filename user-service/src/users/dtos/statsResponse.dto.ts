import { Field, ObjectType } from '@nestjs/graphql';

import { BigIntScalar } from 'database-service-arth/dist';
// Assuming you have a Post entity

@ObjectType()
export class PostDto {
  @Field(() => {
    return BigIntScalar;
  })
  id!: bigint;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => {
    return BigIntScalar;
  })
  modifiedBy!: bigint;

  @Field(() => {
    return BigIntScalar;
  })
  createdBy!: bigint;

  @Field(() => {
    return BigIntScalar;
  })
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

@ObjectType()
export class StatsResponseDto {
  @Field(() => {
    return BigIntScalar;
  })
  id!: bigint;

  @Field(
    () => {
      return PostDto;
    },
    { nullable: true }
  )
  postWithMaxLikes?: PostDto | null;

  @Field(
    () => {
      return PostDto;
    },
    { nullable: true }
  )
  postWithMinLikes?: PostDto | null;

  @Field()
  totalComments!: number;

  @Field()
  totalReplies!: number;

  @Field()
  totalLikesOnPosts!: number;

  @Field()
  totalLikesOnComments!: number;

  @Field()
  totalLikesOnReplies!: number;
}
