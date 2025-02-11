import 'dotenv/config';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserActivityDao } from 'database-service-arth/dist';

import { LikesDao } from './like.dao';
import { LikesResolver } from './like.resolver';
import { LikesService } from './like.service';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [LikesService, LikesResolver, LikesDao, UserActivityDao], // Register BigIntScalar here if needed
  exports: [LikesService],
})
export class LikesModule {}
