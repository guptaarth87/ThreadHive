import { Module } from '@nestjs/common';
import { UserChannelDao } from './userChannel.dao';
import { UserChannelResolver } from './userchannel.resolver';
import { UserChannelService } from './userChannel.service';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { UserActivityDao } from 'database-service/dist';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  imports: [
      JwtModule.register({
        secret: process.env.JWTSECRET,
        signOptions: { expiresIn: '24h' },
      }),
    ],
  providers: [UserChannelService, UserChannelResolver, UserChannelDao, UserActivityDao], // Register BigIntScalar here if needed
  exports: [UserChannelService],
})
export class UserChannelMappingModule {}
