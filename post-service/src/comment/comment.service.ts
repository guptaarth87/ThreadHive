import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';
import { CommentDao } from './comment.dao';
import { CommentResponseDto } from './dtos/commentResponse.dto';
import { CreateCommentInput } from './dtos/createCommentInput.dto';
import { DeleteCommentInput } from './dtos/deleteCommentInput.dto';
import { UpdateCommentInput } from './dtos/updateComment.dto';

@Injectable()
export class CommentsService {
  constructor (private readonly commentDao: CommentDao) {} // Inject `UserDao`

  async createComment (input: CreateCommentInput, context: AuthGaurdContextDto) {
    const dataObject = {
      description: input.description,
      createdBy: input.createdBy,
      modifiedBy: input.createdBy,
      postId: input.postId,
      channelId: input.channelId,
      createdAt: new Date(),
      isDeleted: false,
    };
    return this.commentDao.createCommentDao(dataObject,context);
  }

  async getComments (context: AuthGaurdContextDto): Promise<CommentResponseDto[]> {
    return this.commentDao.getCommentsDao(context);
  }

  async deleteComment (
    input: DeleteCommentInput,
    channelsAllowed: bigint[],
    userId: bigint,
    role: string,
    context: AuthGaurdContextDto
  ): Promise<string> {
    if (
      await this.commentDao.canUserProceed(
        input.id,
        channelsAllowed,
        userId,
        role

      )
    ) {
      return this.commentDao.deleteCommentDao(input,context);
    }
    throw new UnauthorizedException('User not allowed to delete this post');
  }

  async updateComment (
    input: UpdateCommentInput,
    channelsAllowed: bigint[],
    userId: bigint,
    role: string,
    context: AuthGaurdContextDto
  ): Promise<string> {
    if (
      await this.commentDao.canUserProceed(
        input.id,
        channelsAllowed,
        userId,
        role
      )
    ) {
      return this.commentDao.updateComment(input, context);
    }
    throw new UnauthorizedException('User not allowed to delete this post');
  }
}
