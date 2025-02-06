import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

@ObjectType()
export class AuthGaurdContextDto {
  @Field(() => {
    return Request;
  })
  req!: {
    raw?: {
      headers: {
        authorization: string;
      };
    };
  };

  @Field({ nullable: true })
  email!: string;

  @Field({ nullable: true })
  role!: string;

  @Field(()=> BigIntScalar ,
  )
  userId!: bigint;

  @Field(
    () => {
      return [BigIntScalar];
    },
    { nullable: true }
  )
  channelsAllowed!: bigint[];
}
