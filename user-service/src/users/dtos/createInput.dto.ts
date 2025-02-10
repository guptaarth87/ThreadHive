import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

import { UserRole } from '../enums/user-roles.enum'; // Assuming this is imported from a shared module

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/g)
  email!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password!: string;

  @Field(() => {
    return UserRole;
  }) // Referencing the UserRole enum
  @IsNotEmpty()
  role!: UserRole;

  @Field()
  @IsNotEmpty()
  dob!: Date;
}
