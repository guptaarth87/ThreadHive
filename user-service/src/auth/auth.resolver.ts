import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthResponse } from './auth-response.dto';
import { AuthService } from './auth.service';

import { LoginInput } from '../users/dtos/loginInput.dto';

@Resolver()
export class AuthResolver {
  constructor (private readonly authService: AuthService) {}

  @Mutation(() => {
    return AuthResponse;
  })
  async login (@Args('input') input: LoginInput): Promise<AuthResponse> {
    return this.authService.userAuthService(input.email, input.password);
  }
}
