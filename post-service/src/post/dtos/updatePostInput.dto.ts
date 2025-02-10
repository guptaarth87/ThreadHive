import { InputType, Field , registerEnumType} from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';
import {
  IsNotEmpty,
  IsString,
  MinLength,

} from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field(() => BigIntScalar) // Assuming BigIntScalar is properly imported
  id!: bigint;

  @Field(()=>BigIntScalar)
  modifiedBy!: bigint

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  title?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description?: string;

  @Field(()=> BigIntScalar, { nullable: true })
  channelId?: bigint;


  @Field({ nullable: true })
  modifiedAt?: Date;
}