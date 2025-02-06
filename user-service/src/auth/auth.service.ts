import { Injectable } from '@nestjs/common';
import { AuthResponse } from './auth-response.dto';
import { AuthDao } from './auth.dao';

@Injectable()
export class AuthService {
  constructor (private readonly authDao: AuthDao) {}

  async userAuthService (
    email: string,
    password: string
  ): Promise<AuthResponse> {
    return this.authDao.logUserIn(email, password);
  }
}
