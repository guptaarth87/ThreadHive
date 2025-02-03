import { Module } from '@nestjs/common';
import { ChannelsService } from './channel.service';
import { ChannelsResolver } from './channel.resolver';
import { ChannelDao} from './channel.dao';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  providers: [ChannelsService, ChannelsResolver, ChannelDao], // Register BigIntScalar here if needed
  exports: [ChannelsService],
})
export class ChannelsModule {}
