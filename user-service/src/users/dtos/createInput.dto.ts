import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { USERROLE } from 'database-service-arth/dist';



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
    return USERROLE;
  }) // Referencing the USERROLE enum
  @IsNotEmpty()
  role!: USERROLE;

  @Field()
  @IsNotEmpty()
  dob!: Date;
}
