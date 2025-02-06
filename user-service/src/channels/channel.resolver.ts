import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChannelsService } from './channel.service';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';
import { ChannelResponseDto } from './dtos/channelResponse.dto';
import { CreateChannelInput } from './dtos/createChannelInput.dto';
import { DeleteChannelInput } from './dtos/deleteChannelInput.dto';
import { UpdateChannelInput } from './dtos/updateChannelInput.dto';

@Resolver()
export class ChannelsResolver {
  constructor (private readonly channelsService: ChannelsService) {}

  @Query(() => {
    return [ChannelResponseDto];
  })
  async getChannels (): Promise<ChannelResponseDto[]> {
    return this.channelsService.getChannel();
  }

  @Mutation(() => {
    return String;
  })
  @UseGuards(AuthGuard)
  async createChannel (
    @Args('input') input: CreateChannelInput,
    @Context() context: AuthGaurdContextDto
  ): Promise<string> {
    if (context.role === 'SUPERADMIN') {
      return this.channelsService.createChannel(input);
    }
    throw new UnauthorizedException(
      'you are not allowed you are not a super admin'
    );
  }

  @Mutation(() => {
    return String;
  })
  @UseGuards(AuthGuard)
  async deleteChannel (
    @Args('input') input: DeleteChannelInput,
    @Context() context: AuthGaurdContextDto
  ): Promise<string> {
    if (context.role === 'SUPERADMIN') {
      return this.channelsService.deleteChannel(input); // You can access `input.id` directly
    }
    throw new UnauthorizedException(
      'you are not allowed you are not a super admin'
    );
  }

  @Mutation(() => {
    return String;
  })
  @UseGuards(AuthGuard)
  async updateChannel (
    @Args('input') input: UpdateChannelInput,
    @Context() context: AuthGaurdContextDto
  ): Promise<string> {
    if (context.role === 'SUPERADMIN') {
      return this.channelsService.updateChannel(input); // You can access `input.id` directly
    }
    throw new UnauthorizedException(
      'you are not allowed you are not a super admin'
    );
  }
}
