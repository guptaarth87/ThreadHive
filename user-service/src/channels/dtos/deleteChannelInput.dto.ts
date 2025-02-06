import { Field, InputType , registerEnumType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@InputType()
export class DeleteChannelInput {
  @Field(() => {return BigIntScalar;})
  id!: bigint;
}
