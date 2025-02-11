import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service-arth/dist';

@InputType()
export class UpdateChannelInput {
  @Field(() => {
    return BigIntScalar;
  }) // Assuming BigIntScalar is properly imported
  id!: bigint;

  @Field({ nullable: true })
  name?: string;

  @Field()
  modifiedAt?: Date;
}
