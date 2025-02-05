import { Module } from '@nestjs/common';
import { ChannelsService } from './channel.service';
import { ChannelsResolver } from './channel.resolver';
import { ChannelDao} from './channel.dao';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { JwtModule } from '@nestjs/jwt';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  imports:[ JwtModule.register({
              secret: 'ufdeuwdhiu',
              signOptions: { expiresIn: '1h' },
            })],
  providers: [ChannelsService, ChannelsResolver, ChannelDao, AuthGuard], // Register BigIntScalar here if needed
  exports: [ChannelsService],
})
export class ChannelsModule {}
