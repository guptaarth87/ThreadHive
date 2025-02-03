import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UpdateChannelInput } from './dtos/updateChannelInput.dto';
import { DeleteChannelInput } from './dtos/deleteChannelInput.dto';
import { CreateChannelInput } from './dtos/createChannelInput.dto';
import { ChannelResponseDto } from './dtos/channelResponse.dto';
import { ChannelsService } from './channel.service';



@Resolver()
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

 

  @Query(() => [ChannelResponseDto])
  async getChannels(): Promise<ChannelResponseDto[]> {
    return this.channelsService.getChannel();
  }

 
  @Mutation(() => String)
  async createChannel(@Args('input') input: CreateChannelInput): Promise<string> {    
    return this.channelsService.createChannel(input);
  } 

  @Mutation(() => String)
  async deleteChannel(@Args('input') input: DeleteChannelInput): Promise<string> {
    return this.channelsService.deleteChannel(input)  // You can access `input.id` directly
  }

  @Mutation(() => String)
  async updateChannel(@Args('input') input: UpdateChannelInput): Promise<string> {
    return this.channelsService.updateChannel(input)  // You can access `input.id` directly
  }
}
