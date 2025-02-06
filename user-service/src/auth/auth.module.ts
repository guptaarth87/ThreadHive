import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthDao } from './auth.dao';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/user.module';

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
