import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service/dist'

@InputType()
export class DeleteUserChannelInput {
  @Field(() => BigIntScalar)
   id!: bigint;
}