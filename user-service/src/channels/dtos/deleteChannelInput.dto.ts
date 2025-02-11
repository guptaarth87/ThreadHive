import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service-arth/dist';

@InputType()
export class DeleteChannelInput {
  @Field(() => {
    return BigIntScalar;
  })
  id!: bigint;
}
