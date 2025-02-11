import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service-arth/dist'

@InputType()
export class DeletePostInput {
  @Field(() => BigIntScalar)
  id!: bigint;

  
}