import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';
import { LikeType } from '../enums/like-type.enum';

@ObjectType()
export class LikeResponseDto {
  @Field(() =>  BigIntScalar)
  id!: bigint;

  @Field(()=>LikeType)
  type!: LikeType

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