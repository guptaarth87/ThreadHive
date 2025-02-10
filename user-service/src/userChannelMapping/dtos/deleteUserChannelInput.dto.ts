import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@InputType()
export class DeleteUserChannelInput {
  @Field(() => {
    return BigIntScalar;
  })
  id!: bigint;
}
