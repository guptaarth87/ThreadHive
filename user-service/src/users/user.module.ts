import 'dotenv/config';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserActivityDao } from 'database-service/dist';

import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { UserDao } from './user.dao';
import { UsersResolver } from './user.resolver';
import { UsersService } from './user.service';
import { userStatsDao } from './userStats.dao';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    UsersService,
    UsersResolver,
    UserDao,
    userStatsDao,
    UserActivityDao,
    AuthGuard, // Apply the guard to only users
  ], // Register BigIntScalar here if needed
  exports: [UsersService],
})
export class UsersModule {}
