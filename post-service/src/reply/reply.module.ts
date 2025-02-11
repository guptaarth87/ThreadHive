import 'dotenv/config';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserActivityDao } from 'database-service-arth/dist';

import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { ReplyDao } from './reply.dao';
import { RepliesResolver } from './reply.resolver';
import { RepliesService } from './reply.service';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    RepliesService,
    RepliesResolver,
    ReplyDao,
    AuthGuard,
    UserActivityDao,
  ], // Register BigIntScalar here if needed
  exports: [RepliesService],
})
export class RepliesModule {}
