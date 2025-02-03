import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service/dist'

@InputType()
export class CreatePostInput {
  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field(() => BigIntScalar)
  createdBy!: bigint;

  

  @Field(() => BigIntScalar)
  channelId!: bigint;
}