import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';
import { LoginInput } from '../users/dtos/loginInput.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth-response.dto';

@Resolver()
export class AuthResolver {
  constructor (private readonly authService: AuthService) {}

  @Mutation(() => {
    return AuthResponse;
  })
  @UseGuards(AuthGuard)
  async login (
    @Args('input') input: LoginInput,
    @Context() context: AuthGaurdContextDto
  ): Promise<AuthResponse> {
    return this.authService.userAuthService(
      input.email,
      input.password,
      context
    );
  }
}
