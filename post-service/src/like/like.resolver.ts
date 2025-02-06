import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LikeEventInput } from './dtos/likeEventInput.dto';
import { LikeResponseDto } from './dtos/likeResponse.dto';
import { LikesService } from './like.service';

@Resolver()
export class LikesResolver {
  constructor (private readonly likesService: LikesService) {}

  @Query(() => {
    return [LikeResponseDto];
  })
  async getLikes (): Promise<LikeResponseDto[]> {
    return this.likesService.getLikes();
  }

  @Mutation(() => {
    return String;
  })
  async toggleLike (@Args('input') input: LikeEventInput): Promise<string> {
    return this.likesService.toggleLike(input);
  }
}
