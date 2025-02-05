import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { UserResponseDto } from './dtos/response.dto';
import { CreateUserInput } from './dtos/createInput.dto';
import { DeleteUserInput } from './dtos/deleteInput.dto';
import { UpdateUserInput } from './dtos/updateInput.dto';
import { StatsResponseDto } from './dtos/statsResponse.dto';
import { StatsUserInput } from './dtos/statsInput.dto';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserResponseDto])
  @UseGuards(AuthGuard)
  async getUsers(@Context() context: any): Promise<UserResponseDto[]> {
    if (context.role == 'ADMIN' || context.role == 'SUPERADMIN') {
      return this.usersService.getUsers();
    } else {
      throw new UnauthorizedException(
        `You dont have access to this request with role of user}`
      );
    }
  }

  @Query(() => [UserResponseDto])
  @UseGuards(AuthGuard)
  async getUserByEmail(
    @Args('email') email: string,
    @Context() context: any
  ): Promise<UserResponseDto[]> {
    // console.log("resolver access",cont)
    if (email == context.email) {
      return this.usersService.findUserByEmail(email);
    } else {
      throw new UnauthorizedException(
        `You dont have access to this request of email ${email}`
      );
    }
  }

  @Query(() => [StatsResponseDto])
  @UseGuards(AuthGuard)
  async getUserStats(
    @Args('input') input: StatsUserInput
  ): Promise<StatsResponseDto[]> {
    return this.usersService.getUserStats(input);
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: CreateUserInput, @Context() context: any): Promise<string> {
    if (input.role == 'SUPERADMIN'){
      throw new UnauthorizedException(
        `You dont have access to this request of creating user of role ${context.role}`
      );
    }else if (input.role == 'ADMIN' && context.role != 'SUPERADMIN'){
      throw new UnauthorizedException(
        `You dont have access to this request of creating user of role ${context.role}`
      );
    }else{
      return this.usersService.createUser(input);
    }
    
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async deleteUser(
    @Args('input') input: DeleteUserInput,
    @Context() context: any
  ): Promise<string> {
    const { id } = input;
    if (id == context.id && context.role == 'USER') {
      return this.usersService.deleteUser(input,context.role); // You can access `input.id` directly
    } else if(context.role == 'ADMIN'){
      return this.usersService.deleteUser(input,context.role,context.channels);
    } else {
      throw new UnauthorizedException(
        `You dont have rights to this to delete user of id ${id}`
      );
    }
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @Context() context: any
  ): Promise<string> {
    const { id } = input;
    if (id == context.id) {
      return this.usersService.updateUser(input); // You can access `input.id` directly
    } else {
      throw new UnauthorizedException(
        `You dont have rights to this to update user of id ${id}`
      );
    }
  }
}
