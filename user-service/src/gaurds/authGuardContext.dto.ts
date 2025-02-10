import { Field, ObjectType } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

import { UserRole } from '../users/enums/user-roles.enum';

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
  activityDone!: string;

  @Field({ nullable: true })
  role!: string;

  @Field(
    () => {
      return BigIntScalar;
    },
    { nullable: true }
  )
  userId!: bigint;

  @Field(
    () => {
      return [BigIntScalar];
    },
    { nullable: true }
  )
  channels?: bigint[];
}

@ObjectType()
export class DecodedTokenDto {
  @Field()
  role!: UserRole;

  @Field(() => {
    return BigIntScalar;
  })
  sub!: bigint;

  @Field()
  email!: string;
}
