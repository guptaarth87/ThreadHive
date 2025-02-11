import 'dotenv/config';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserActivityDao } from 'database-service/dist';

import { UsersModule } from '../users/user.module';
import { AuthDao } from './auth.dao';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, AuthResolver, AuthDao, UserActivityDao],
})
export class AuthModule {}
