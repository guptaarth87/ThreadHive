import { Injectable } from '@nestjs/common';
import { ReplyDao } from './reply.dao';
import { UpdateReplyInput } from './dtos/updateReply.dto';
import { DeleteReplyInput } from './dtos/deleteReply.dto';
import { ReplyResponseDto } from './dtos/replyComment.dto';
import { CreateReplyInput } from './dtos/createReply.dto';


@Injectable()
export class RepliesService {
  constructor(private readonly replyDao: ReplyDao) {} // Inject `UserDao`

  async createReply(input: CreateReplyInput) {
    return this.replyDao.createReplyDao(input);
  }

 

  async getReplys():Promise<ReplyResponseDto[]> {
    return this.replyDao.getReplysDao();
  }

  async deleteReply(input: DeleteReplyInput): Promise<string>{
    return this.replyDao.deleteReplyDao(input)
  }

  async updateReply(input: UpdateReplyInput): Promise<string>{
    return this.replyDao.updateReply(input)
  }
}
