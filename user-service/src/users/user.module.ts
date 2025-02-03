import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersResolver } from './user.resolver';
import { UserDao } from './user.dao';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  providers: [UsersService, UsersResolver, UserDao], // Register BigIntScalar here if needed
  exports: [UsersService],
})
export class UsersModule {}
