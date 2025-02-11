import { InputType, Field } from '@nestjs/graphql';
import  {BigIntScalar} from 'database-service-arth/dist'
import {
  IsNotEmpty,
  IsString,
  MinLength,

} from 'class-validator';

@InputType()
export class CreatePostInput {
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

  @Field(() => BigIntScalar)
  createdBy!: bigint;

  

  @Field(() => BigIntScalar)
  channelId!: bigint;
}