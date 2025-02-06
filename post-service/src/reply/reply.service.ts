import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateReplyInput } from './dtos/createReply.dto';
import { DeleteReplyInput } from './dtos/deleteReply.dto';
import { ReplyResponseDto } from './dtos/replyComment.dto';
import { UpdateReplyInput } from './dtos/updateReply.dto';
import { ReplyDao } from './reply.dao';

@Injectable()
export class RepliesService {
  constructor (private readonly replyDao: ReplyDao) {} // Inject `UserDao`

  async createReply (input: CreateReplyInput) {
    const dataObject = {
      description: input.description,
      createdBy: input.createdBy,
      modifiedBy: input.createdBy,
      commentId: input.commentId,
      postId: input.postId,
      channelId: input.channelId,
      createdAt: new Date(),
      isDeleted: false,
    };
    return this.replyDao.createReplyDao(dataObject);
  }

  async getReplies (): Promise<ReplyResponseDto[]> {
    return this.replyDao.getRepliesDao();
  }

  async deleteReply (
    input: DeleteReplyInput,
    channelsAllowed: bigint[],
    userId: bigint,
    role: string
  ): Promise<string> {
    if (
      await this.replyDao.canUserProceed(
        input.id,
        channelsAllowed,
        userId,
        role
      )
    ) {
      return this.replyDao.deleteReplyDao(input);
    }
    throw new UnauthorizedException('User not allowed to delete this post');
  }

  async updateReply (
    input: UpdateReplyInput,
    channelsAllowed: bigint[],
    userId: bigint,
    role: string
  ): Promise<string> {
    if (
      await this.replyDao.canUserProceed(
        input.id,
        channelsAllowed,
        userId,
        role
      )
    ) {
      return this.replyDao.updateReply(input);
    }
    throw new UnauthorizedException('User not allowed to delete this post');
  }
}
