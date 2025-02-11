import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BigIntScalar } from 'database-service/dist';

@ObjectType()
export class ChannelResponseDto {
  @Field(() => {
    return BigIntScalar;
  })
  id!: bigint;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
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
