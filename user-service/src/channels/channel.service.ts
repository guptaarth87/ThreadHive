import { Injectable } from '@nestjs/common';
import { ChannelDao } from './channel.dao';
import { ChannelResponseDto } from './dtos/channelResponse.dto';
import { CreateChannelInput } from './dtos/createChannelInput.dto';
import { DeleteChannelInput } from './dtos/deleteChannelInput.dto';
import { UpdateChannelInput } from './dtos/updateChannelInput.dto';
import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';

@Injectable()
export class ChannelsService {
  constructor (private readonly channelDao: ChannelDao) {} // Inject `ChannelDao`

  async createChannel (input: CreateChannelInput, context: AuthGaurdContextDto) {
    return this.channelDao.createChannelDao(input,context);
  }

  async getChannel (context: AuthGaurdContextDto):Promise<ChannelResponseDto[]> {
    return this.channelDao.getChannelsDao(context);
  }

  async deleteChannel (input: DeleteChannelInput,context: AuthGaurdContextDto): Promise<string> {
    return this.channelDao.deleteChannelDao(input, context);
  }

  async updateChannel (input: UpdateChannelInput,context: AuthGaurdContextDto): Promise<string> {
    return this.channelDao.updateChannel(input,context);
  }
}
