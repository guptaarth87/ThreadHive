import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from './bigintSclalerConversion';


// @Directive('@key(fields: "id")')
@ObjectType()
export class UserActivityResponseDto {
  @Field(() =>  BigIntScalar)
  id!: bigint;

  @Field()
  activity!:string;

  @Field(() => BigIntScalar)
  actionBy!: bigint;

  @Field()
  createdAt!: Date;

  @Field(() => String, { nullable: true })
  additionalData!: Record<string, any>;
}


