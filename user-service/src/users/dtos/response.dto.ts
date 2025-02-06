import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

// @Directive('@key(fields: "id")')
@ObjectType()
export class UserResponseDto {
  @Field(() => BigIntScalar)
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

  @Field(()=> Date,{ nullable: true })
  modifiedAt?: Date | null;

  @Field(()=> Date,{ nullable: true })
  deletedAt?: Date | null ;

  @Field(()=> Boolean,{ nullable: true })
  isDeleted!: boolean | null;
}
