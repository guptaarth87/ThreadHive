import { InputType, Field , registerEnumType} from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';


@InputType()
export class UpdateChannelInput {
  @Field(() => BigIntScalar) // Assuming BigIntScalar is properly imported
  id!: bigint;

  @Field({ nullable: true })
  name?: string;

  @Field()
  modifiedAt?: Date;
}