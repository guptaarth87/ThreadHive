import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CommentsService } from './comment.service';
import { CommentResponseDto } from './dtos/commentResponse.dto';
import { CreateCommentInput } from './dtos/createCommentInput.dto';
import { DeleteCommentInput } from './dtos/deleteCommentInput.dto';
import { UpdateCommentInput } from './dtos/updateComment.dto';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { UnauthorizedException, UseGuards } from '@nestjs/common';



@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

 

  @Query(() => [CommentResponseDto])
  async getComments(): Promise<CommentResponseDto[]> {
    return this.commentsService.getComments();
  }

  
  
  @Mutation(() => String)
  @UseGuards(AuthGuard)
  async createComment(@Args('input') input: CreateCommentInput, @Context() context: any): Promise<string> {    
    if (context.channelsAllowed.includes(input.channelId) && context.userId == input.createdBy){
    return this.commentsService.createComment(input);
    } else {
          throw new UnauthorizedException(`you dont have access to this channel -> ${input.channelId}`);
    }
  } 

  @Mutation(() => String)
  async deleteComment(@Args('input') input: DeleteCommentInput): Promise<string> {
    return this.commentsService.deleteComment(input)  // You can access `input.id` directly
  }

  @Mutation(() => String)
  async updateComment(@Args('input') input: UpdateCommentInput): Promise<string> {
    return this.commentsService.updateComment(input)  // You can access `input.id` directly
  }
}
