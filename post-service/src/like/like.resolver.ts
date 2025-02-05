import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LikesService } from './like.service';
import { LikeResponseDto } from './dtos/likeResponse.dto';
import { LikeEventInput } from './dtos/likeEventInput.dto';



@Resolver()
export class LikesResolver {
  constructor(private readonly likesService: LikesService
  ) {}

 

  @Query(() => [LikeResponseDto])
  async getLikes(): Promise<LikeResponseDto[]> {
    return this.likesService.getLikes();
  }

  
  
  @Mutation(() => String)
  async toggleLike(@Args('input') input: LikeEventInput): Promise<string> {    
    return this.likesService.toggleLike(input);
  } 

  
}
