import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/user.module';
import { AuthDao } from './auth.dao';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'ufdeuwdhiu',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, AuthResolver, AuthDao],
})
export class AuthModule {}