import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserChannelService } from './userChannel.service';
import { UserChannelResponseDto } from './dtos/responseUserChannel.dto';
import { CreateUserChannelInput } from './dtos/createUserChannelInput.dto';
import { DeleteUserChannelInput } from './dtos/deleteUserChannelInput.dto';
import { UpdateUserChannelInput } from './dtos/updateUserChannelInput.dto';



@Resolver()
export class UserChannelResolver {
  constructor(private readonly userChannelService: UserChannelService) {}

 

  @Query(() => [UserChannelResponseDto])
  async getUserChannelMapping(): Promise<UserChannelResponseDto[]> {
    return this.userChannelService.getUserChannelMapping();
  }


  
  @Mutation(() => String)
  async createUserChannelMapping(@Args('input') input: CreateUserChannelInput): Promise<string> {    
    return this.userChannelService.createUserChannelMapping(input);
  } 

  @Mutation(() => String)
  async deleteUserChannelMapping(@Args('input') input: DeleteUserChannelInput): Promise<string> {
    return this.userChannelService.deleteUserChannelMapping(input)  // You can access `input.id` directly
  }

  @Mutation(() => String)
  async updateUserChannelMapping(@Args('input') input: UpdateUserChannelInput): Promise<string> {
    return this.userChannelService.updateUserChannelMapping(input)  // You can access `input.id` directly
  }
}
