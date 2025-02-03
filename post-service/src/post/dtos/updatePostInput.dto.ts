import { InputType, Field , registerEnumType} from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';


@InputType()
export class UpdatePostInput {
  @Field(() => BigIntScalar) // Assuming BigIntScalar is properly imported
  id!: bigint;

  @Field(()=>BigIntScalar)
  modifiedBy!: bigint

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(()=> BigIntScalar, { nullable: true })
  channelId?: bigint;


  @Field({ nullable: true })
  modifiedAt?: Date;
}