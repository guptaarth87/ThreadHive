import { ObjectType, Field, ID, InputType, Directive } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

// @Directive('@key(fields: "id")')
@ObjectType()
export class UserResponseDto {
  @Field(() =>  BigIntScalar)
  id!: bigint;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;

  @Field()
  role!: string;

  @Field()
  dob!: Date;

  @Field()
  createdAt!: Date;

  @Field({ nullable: true })
  modifiedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field()
  isDeleted!: boolean;
}