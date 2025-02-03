import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { UserResponseDto } from './dtos/Response.dto';
import { CreateUserInput } from './dtos/CreateInput.dto';
import { DeleteUserInput } from './dtos/DeleteInput.dto';
import { UpdateUserInput } from './dtos/UpdateInput.dto';


@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

 

  @Query(() => [UserResponseDto])
  async getUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getUsers();
  }

  @Query(()=> [UserResponseDto])
  async getUserByEmail(@Args('email') email: string): Promise<UserResponseDto[]>{
    
    return this.usersService.findUserByEmail(email)
  }
  
  @Mutation(() => String)
  async createUser(@Args('input') input: CreateUserInput): Promise<string> {    
    return this.usersService.createUser(input);
  } 

  @Mutation(() => String)
  async deleteUser(@Args('input') input: DeleteUserInput): Promise<string> {
    return this.usersService.deleteUser(input)  // You can access `input.id` directly
  }

  @Mutation(() => String)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<string> {
    return this.usersService.updateUser(input)  // You can access `input.id` directly
  }
}
