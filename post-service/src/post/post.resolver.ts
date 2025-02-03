import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './post.service';
import { PostResponseDto } from './dtos/postResponse.dto';
import { CreatePostInput } from './dtos/createPostInput.dto';
import { DeletePostInput } from './dtos/deletePostInput.dto';
import { UpdatePostInput } from './dtos/updatePostInput.dto';



@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

 

  @Query(() => [PostResponseDto])
  async getPosts(): Promise<PostResponseDto[]> {
    return this.postsService.getPosts();
  }

  
  
  @Mutation(() => String)
  async createpost(@Args('input') input: CreatePostInput): Promise<string> {    
    return this.postsService.createPost(input);
  } 

  @Mutation(() => String)
  async deletepost(@Args('input') input: DeletePostInput): Promise<string> {
    return this.postsService.deletePost(input)  // You can access `input.id` directly
  }

  @Mutation(() => String)
  async updatepost(@Args('input') input: UpdatePostInput): Promise<string> {
    return this.postsService.updatePost(input)  // You can access `input.id` directly
  }
}
