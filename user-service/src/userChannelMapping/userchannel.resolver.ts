import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserChannelInput } from './dtos/createUserChannelInput.dto';
import { DeleteUserChannelInput } from './dtos/deleteUserChannelInput.dto';
import { UserChannelResponseDto } from './dtos/responseUserChannel.dto';
import { UpdateUserChannelInput } from './dtos/updateUserChannelInput.dto';
import { UserChannelService } from './userChannel.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';

@Resolver()
export class UserChannelResolver {
  constructor (private readonly userChannelService: UserChannelService) {}

  @Query(() => {
    return [UserChannelResponseDto];
  })
  @UseGuards(AuthGuard)
  async getUserChannelMapping (@Context() context: AuthGaurdContextDto): Promise<UserChannelResponseDto[]> {
    return this.userChannelService.getUserChannelMapping(context);
  }

  @Mutation(() => {
    return String;
  })
  @UseGuards(AuthGuard)
  async createUserChannelMapping (
    @Args('input') input: CreateUserChannelInput,
    @Context() context: AuthGaurdContextDto
  ): Promise<string> {
    return this.userChannelService.createUserChannelMapping(input,context);
  }

  @Mutation(() => {
    return String;
  })
  @UseGuards(AuthGuard)
  
  async deleteUserChannelMapping (
    @Args('input') input: DeleteUserChannelInput,
    @Context() context: AuthGaurdContextDto
  ): Promise<string> {
    return this.userChannelService.deleteUserChannelMapping(input,context); // You can access `input.id` directly
  }

  @Mutation(() => {
    return String;
  })
  @UseGuards(AuthGuard)
  async updateUserChannelMapping (
    @Args('input') input: UpdateUserChannelInput,
    @Context() context: AuthGaurdContextDto
  ): Promise<string> {
    return this.userChannelService.updateUserChannelMapping(input,context); // You can access `input.id` directly
  }
}
