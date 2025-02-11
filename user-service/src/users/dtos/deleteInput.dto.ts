import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service-arth/dist';

@InputType()
export class DeleteUserInput {
  @Field(() => {
    return BigIntScalar;
  })
  id!: bigint;
}
