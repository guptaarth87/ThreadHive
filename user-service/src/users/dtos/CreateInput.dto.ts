import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../enums/user-roles.enum'; // Assuming this is imported from a shared module

@InputType()
export class CreateUserInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field(() => UserRole) // Referencing the UserRole enum
  role!: UserRole;

  @Field()
  dob!: Date;
}