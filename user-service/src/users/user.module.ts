import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserDao } from './user.dao';
import { UsersResolver } from './user.resolver';
import { UsersService } from './user.service';
import { userStatsDao } from './userStats.dao';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { UserActivityDao } from 'database-service/dist';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  imports: [
    JwtModule.register({
      secret: 'ufdeuwdhiu',
      signOptions: { expiresIn: '1h' },
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
