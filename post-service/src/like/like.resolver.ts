import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';
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
  @UseGuards(AuthGuard)
  async toggleLike (
    @Args('input') input: LikeEventInput,
    @Context() context: AuthGaurdContextDto
  ): Promise<string> {
    if (
      context.channelsAllowed.includes(input.channelId) ||
      context.role === 'SUPERADMIN'
    ) {
      return this.likesService.toggleLike(input, context);
    }
      throw new UnauthorizedException(
        `You are not allowed to make changes in this channel of id -> ${input.channelId}`
      );

  }
}
