import { Injectable } from '@nestjs/common';
import { AuthResponse } from './auth-response.dto';
import { AuthDao } from './auth.dao';
import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';

@Injectable()
export class AuthService {
  constructor (private readonly authDao: AuthDao) {}

  async userAuthService (
    email: string,
    password: string,
    context: AuthGaurdContextDto
  ): Promise<AuthResponse> {
    return this.authDao.logUserIn(email, password, context);
  }
}
