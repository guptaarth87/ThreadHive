import { ObjectType, Field } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';// Assuming you have a Post entity

@ObjectType()
export class PostDto {
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


@ObjectType()
export class StatsResponseDto {
  @Field(() => BigIntScalar)
  id!: bigint;

  @Field(() => PostDto, { nullable: true })
  postWithMaxLikes?: PostDto | null;

  @Field(() => PostDto, { nullable: true })
  postWithMinLikes?: PostDto | null;

  @Field()
  total_comments!: number;

  @Field()
  total_replies!: number;

  @Field()
  total_likes_on_posts!: number;

  @Field()
  total_likes_on_comments!: number;

  @Field()
  total_likes_on_replies!: number;
}