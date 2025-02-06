import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChannelDao } from './channel.dao';
import { ChannelsResolver } from './channel.resolver';
import { ChannelsService } from './channel.service';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  imports: [
    JwtModule.register({
      secret: 'ufdeuwdhiu',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ChannelsService, ChannelsResolver, ChannelDao, AuthGuard], // Register BigIntScalar here if needed
  exports: [ChannelsService],
})
export class ChannelsModule {}
