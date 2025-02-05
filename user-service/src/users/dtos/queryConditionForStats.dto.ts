import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsDate, IsNumber } from 'class-validator';

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

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  userId?: number;
}
