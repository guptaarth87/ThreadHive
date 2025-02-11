// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here
import 'dotenv/config';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserActivityDao } from 'database-service/dist';

import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { ChannelDao } from './channel.dao';
import { ChannelsResolver } from './channel.resolver';
import { ChannelsService } from './channel.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    ChannelsService,
    ChannelsResolver,
    ChannelDao,
    UserActivityDao,
    AuthGuard,
  ], // Register BigIntScalar here if needed
  exports: [ChannelsService],
})
export class ChannelsModule {}
