import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service-arth/dist';

// @Directive('@key(fields: "id")')
@ObjectType()
export class UserResponseDto {
  @Field(() => {
    return BigIntScalar;
  })
  id!: bigint;

  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  password?: string;

  @Field()
  role!: string;

  @Field()
  dob!: Date;

  @Field()
  createdAt!: Date;

  @Field(
    () => {
      return Date;
    },
    { nullable: true }
  )
  modifiedAt?: Date | null;

  @Field(
    () => {
      return Date;
    },
    { nullable: true }
  )
  deletedAt?: Date | null;

  @Field(
    () => {
      return Boolean;
    },
    { nullable: true }
  )
  isDeleted!: boolean | null;
}
