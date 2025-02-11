import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { BigIntScalar, LIKETYPE } from 'database-service-arth/dist';

@ObjectType()
export class LikeResponseDto {
  @Field(() =>  BigIntScalar)
  id!: bigint;

  @Field(()=>LIKETYPE)
  type!: LIKETYPE

  @Field(() => BigIntScalar)
  typeId!: bigint;
  
  @Field(()=> BigIntScalar)
  likedBy!: bigint;

  @Field(()=> BigIntScalar)
  channelId!: bigint;

  @Field(() => BigIntScalar)
  postId!: bigint;
  
  @Field()
  createdAt!: Date;

 
}