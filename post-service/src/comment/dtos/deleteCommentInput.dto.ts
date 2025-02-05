import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service/dist'

@InputType()
export class DeleteCommentInput {
  @Field(() => BigIntScalar)
  id!: bigint;

  
}