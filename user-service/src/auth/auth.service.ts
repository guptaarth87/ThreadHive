import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/user.service';
import { AuthDao } from './auth.dao';
import { AuthResponse } from './auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    
    private readonly  authDao: AuthDao
  ) {}

  async userAuthService(email: string, password: string): Promise<AuthResponse>{
    return this.authDao.logUserIn(email,password)
  }
}