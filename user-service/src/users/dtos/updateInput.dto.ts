import { Field, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';
import { UserRole } from '../enums/user-roles.enum';

@InputType()
export class UpdateUserInput {
  @Field(() => BigIntScalar) // Assuming BigIntScalar is properly imported
  id!: bigint;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  role?: UserRole; // The role is optional here

  @Field({ nullable: true })
  dob?: Date;

  @Field()
  modifiedAt?: Date;
}
