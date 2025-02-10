import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { BigIntScalar } from 'database-service/dist';

@InputType()
export class ConditionForStatsDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @Field(
    () => {
      return BigIntScalar;
    },
    { nullable: true }
  )
  @IsOptional()
  @IsNumber()
  userId?: bigint;
}
