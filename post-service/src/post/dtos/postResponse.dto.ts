import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service-arth/dist';
import {
  IsNotEmpty,
  IsString,
  MinLength,

} from 'class-validator';

@ObjectType()
export class PostResponseDto {
  @Field(() =>  BigIntScalar)
  id!: bigint;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  title!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description!: string;

  @Field(()=> BigIntScalar)
  modifiedBy! : bigint

  @Field(()=> BigIntScalar)
  createdBy!: bigint;

  @Field(()=> BigIntScalar)
  channelId!: bigint;

  @Field()
  createdAt!: Date;

  @Field({ nullable: true })
  modifiedAt?: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field()
  isDeleted!: boolean;
}