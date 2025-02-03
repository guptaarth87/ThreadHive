import { InputType, Field } from '@nestjs/graphql';
// Assuming this is imported from a shared module

@InputType()
export class CreateChannelInput {
  @Field()
  name!: string;

}