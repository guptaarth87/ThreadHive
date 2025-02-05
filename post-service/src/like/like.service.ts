import { Injectable } from '@nestjs/common';
import { LikesDao } from './like.dao';
import { LikeEventInput } from './dtos/likeEventInput.dto';
import { LikeResponseDto } from './dtos/likeResponse.dto';




@Injectable()
export class LikesService {
  constructor(private readonly likeDao: LikesDao) {} // Inject `UserDao`

  async toggleLike(input: LikeEventInput) {
    return this.likeDao.likeToggleDao(input);
  }


  async getLikes():Promise<LikeResponseDto[]> {
    return this.likeDao.getLikesDao();
  }

}
