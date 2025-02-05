import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';

import { AuthResponse } from './auth-response.dto';
import { LoginInput } from '../users/dtos/loginInput.dto';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}


  @Mutation(() => AuthResponse )
  async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
         return this.authService.userAuthService(input.email , input.password)
  }
}