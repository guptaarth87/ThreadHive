import { Injectable } from '@nestjs/common';
import { ChannelDao } from './channel.dao';
import { ChannelResponseDto } from './dtos/channelResponse.dto';
import { CreateChannelInput } from './dtos/createChannelInput.dto';
import { DeleteChannelInput } from './dtos/deleteChannelInput.dto';
import { UpdateChannelInput } from './dtos/updateChannelInput.dto';

@Injectable()
export class ChannelsService {
  constructor (private readonly channelDao: ChannelDao) {} // Inject `ChannelDao`

  async createChannel (input: CreateChannelInput) {
    return this.channelDao.createChannelDao(input);
  }

  async getChannel ():Promise<ChannelResponseDto[]> {
    return this.channelDao.getChannelsDao();
  }

  async deleteChannel (input: DeleteChannelInput): Promise<string> {
    return this.channelDao.deleteChannelDao(input);
  }

  async updateChannel (input: UpdateChannelInput): Promise<string> {
    return this.channelDao.updateChannel(input);
  }
}
