import { Injectable } from '@nestjs/common';
import { CommentDao } from './comment.dao';
import { DeleteCommentInput } from './dtos/deleteCommentInput.dto';
import { UpdateCommentInput } from './dtos/updateComment.dto';
import { CommentResponseDto } from './dtos/commentResponse.dto';
import { CreateCommentInput } from './dtos/createCommentInput.dto';


@Injectable()
export class CommentsService {
  constructor(private readonly commentDao: CommentDao) {} // Inject `UserDao`

  async createComment(input: CreateCommentInput) {
    return this.commentDao.createCommentDao(input);
  }

 

  async getComments():Promise<CommentResponseDto[]> {
    return this.commentDao.getCommentsDao();
  }

  async deleteComment(input: DeleteCommentInput): Promise<string>{
    return this.commentDao.deleteCommentDao(input)
  }

  async updateComment(input: UpdateCommentInput): Promise<string>{
    return this.commentDao.updateComment(input)
  }
}
