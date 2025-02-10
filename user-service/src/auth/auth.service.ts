import { Injectable } from '@nestjs/common';

import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';
import { AuthDao } from './auth.dao';
import { AuthResponse } from './auth-response.dto';

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
