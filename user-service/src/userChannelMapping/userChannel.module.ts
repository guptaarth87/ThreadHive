import { Module } from '@nestjs/common';
import { UserChannelDao } from './userChannel.dao';
import { UserChannelResolver } from './userchannel.resolver';
import { UserChannelService } from './userChannel.service';

// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  providers: [UserChannelService, UserChannelResolver, UserChannelDao], // Register BigIntScalar here if needed
  exports: [UserChannelService],
})
export class UserChannelMappingModule {}
