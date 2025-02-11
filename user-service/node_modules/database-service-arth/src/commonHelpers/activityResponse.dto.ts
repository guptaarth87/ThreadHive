import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from './bigintSclalerConversion';

// import { GraphQLJSON } from 'graphql-type-json';

// @Directive('@key(fields: "id")')
@ObjectType()
export class UserActivityResponseDto {
  @Field(() => BigIntScalar)
  id!: bigint;

  @Field()
  activity!: string;

  @Field(() => BigIntScalar)
  actionBy!: bigint;

  @Field()
  createdAt!: Date;

  @Field(
    () => 
    // GraphQLJSON,
    String,
    { nullable: true }
  )
  additionalData!: Record<string, any>;
}
