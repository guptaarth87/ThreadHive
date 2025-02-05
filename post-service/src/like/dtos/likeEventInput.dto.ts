import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service/dist'
import { LikeType } from '../enums/like-type.enum';

@InputType()
export class LikeEventInput {

  @Field(() =>LikeType )
  type!: LikeType;

  @Field(() => BigIntScalar)
  typeId!: bigint;

  @Field(() => BigIntScalar)
  likedBy!: bigint;

  @Field(() => BigIntScalar)
  channelId!: bigint;

  @Field(() => BigIntScalar)
  postId!: bigint;
}