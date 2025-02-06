import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserChannelInput } from './dtos/createUserChannelInput.dto';
import { DeleteUserChannelInput } from './dtos/deleteUserChannelInput.dto';
import { UserChannelResponseDto } from './dtos/responseUserChannel.dto';
import { UpdateUserChannelInput } from './dtos/updateUserChannelInput.dto';
import { UserChannelService } from './userChannel.service';

@Resolver()
export class UserChannelResolver {
  constructor (private readonly userChannelService: UserChannelService) {}

  @Query(() => {
    return [UserChannelResponseDto];
  })
  async getUserChannelMapping (): Promise<UserChannelResponseDto[]> {
    return this.userChannelService.getUserChannelMapping();
  }

  @Mutation(() => {
    return String;
  })
  async createUserChannelMapping (
    @Args('input') input: CreateUserChannelInput
  ): Promise<string> {
    return this.userChannelService.createUserChannelMapping(input);
  }

  @Mutation(() => {
    return String;
  })
  async deleteUserChannelMapping (
    @Args('input') input: DeleteUserChannelInput
  ): Promise<string> {
    return this.userChannelService.deleteUserChannelMapping(input); // You can access `input.id` directly
  }

  @Mutation(() => {
    return String;
  })
  async updateUserChannelMapping (
    @Args('input') input: UpdateUserChannelInput
  ): Promise<string> {
    return this.userChannelService.updateUserChannelMapping(input); // You can access `input.id` directly
  }
}
