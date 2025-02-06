import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@ObjectType()
export class ChannelResponseDto {
  @Field(() => {return BigIntScalar;})
  id!: bigint;

  @Field()
  name!: string;

  @Field()
  createdAt!: Date;

  @Field({ nullable: true })
  modifiedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field()
  isDeleted!: boolean;
}