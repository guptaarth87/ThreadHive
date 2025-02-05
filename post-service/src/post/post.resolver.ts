import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PostsService } from './post.service';
import { PostResponseDto } from './dtos/postResponse.dto';
import { CreatePostInput } from './dtos/createPostInput.dto';
import { DeletePostInput } from './dtos/deletePostInput.dto';
import { UpdatePostInput } from './dtos/updatePostInput.dto';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { UnauthorizedException, UseGuards } from '@nestjs/common';



@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

 

  @Query(() => [PostResponseDto])
  async getPosts(): Promise<PostResponseDto[]> {
    return this.postsService.getPosts();
  }

  
  
  @Mutation(() => String)
  async createpost(@Args('input') input: CreatePostInput , @Context() context: any): Promise<string> {    
    if (context.channelsAllowed.includes(input.channelId) && context.userId == input.createdBy){
      return this.postsService.createPost(input);
    } else {
      throw new UnauthorizedException(`you dont have access to this channel -> ${input.channelId}`);
    }
    
  } 

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async deletepost(@Args('input') input: DeletePostInput): Promise<string> {

    return this.postsService.deletePost(input)  // You can access `input.id` directly
  }

  @Mutation(() => String)
  async updatepost(@Args('input') input: UpdatePostInput): Promise<string> {
    return this.postsService.updatePost(input)  // You can access `input.id` directly
  }
}
