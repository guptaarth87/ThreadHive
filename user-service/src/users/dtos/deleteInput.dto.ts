import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@InputType()
export class DeleteUserInput {
  @Field(() => BigIntScalar)
  id!: bigint;
}
