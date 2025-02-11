import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar, LIKETYPE} from 'database-service-arth/dist'


@InputType()
export class LikeEventInput {

  @Field(() =>LIKETYPE )
  type!: LIKETYPE;

  @Field(() => BigIntScalar)
  typeId!: bigint;

  @Field(() => BigIntScalar)
  likedBy!: bigint;

  @Field(() => BigIntScalar)
  channelId!: bigint;

  @Field(() => BigIntScalar)
  postId!: bigint;
}