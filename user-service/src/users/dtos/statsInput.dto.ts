import { InputType, Field , registerEnumType} from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';
import { UserRole } from '../enums/user-roles.enum';

@InputType()
export class StatsUserInput {
  

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
 
  @Field(() => BigIntScalar, { nullable: true }) // Assuming BigIntScalar is properly imported
  userId?: bigint;

}