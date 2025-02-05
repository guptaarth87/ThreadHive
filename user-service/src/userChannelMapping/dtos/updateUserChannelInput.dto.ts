import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service/dist'

@InputType()
export class UpdateUserChannelInput {
  @Field(() => BigIntScalar)
   id!: bigint;

  @Field(()=>BigIntScalar)
  userId?: bigint;

  @Field(()=>BigIntScalar)
  channelId?: bigint;

  @Field()
  modifiedAt?: Date;
}