import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersResolver } from './user.resolver';
import { UserDao } from './user.dao';
import { userStatsDao } from './userStats.dao';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { JwtModule } from '@nestjs/jwt';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  imports:[ JwtModule.register({
            secret: 'ufdeuwdhiu',
            signOptions: { expiresIn: '1h' },
          })],
  providers: [UsersService, UsersResolver, UserDao, userStatsDao,

       AuthGuard, // Apply the guard to only users
    
  ], // Register BigIntScalar here if needed
  exports: [UsersService],
})
export class UsersModule {}
