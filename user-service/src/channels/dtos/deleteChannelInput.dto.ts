import { InputType, Field , registerEnumType} from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service/dist'


@InputType()
export class DeleteChannelInput {
  @Field(() => BigIntScalar)
  id!: bigint;
}
