import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';

import { UpdateReplyInput } from './dtos/updateReply.dto';
import { DeleteReplyInput } from './dtos/deleteReply.dto';
import { ReplyResponseDto } from './dtos/replyComment.dto';
import { CreateReplyInput } from './dtos/createReply.dto';
import { RepliesService } from './reply.service';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';


@Resolver()
export class RepliesResolver {
  constructor(private readonly repliesService: RepliesService
  ) {}

 

  @Query(() => [ReplyResponseDto])
  @UseGuards(AuthGuard)
  async getReplys(): Promise<ReplyResponseDto[]> {
    return this.repliesService.getReplys();
  }

  
  
  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async createReply(@Args('input') input: CreateReplyInput,@Context() context: any): Promise<string> {    
    if (context.channelsAllowed.includes(input.channelId) && context.userId == input.createdBy){
          return this.repliesService.createReply(input);
    } else {
          throw new UnauthorizedException(`you dont have access to this channel -> ${input.channelId}`);
        }
  } 

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async deleteReply(@Args('input') input: DeleteReplyInput): Promise<string> {
    return this.repliesService.deleteReply(input)  // You can access `input.id` directly
  }

  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async updateReply(@Args('input') input: UpdateReplyInput): Promise<string> {
    return this.repliesService.updateReply(input)  // You can access `input.id` directly
  }
}
