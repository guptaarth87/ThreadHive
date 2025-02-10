import { Injectable } from '@nestjs/common';

import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';
import { LikeEventInput } from './dtos/likeEventInput.dto';
import { LikeResponseDto } from './dtos/likeResponse.dto';
import { LikesDao } from './like.dao';

@Injectable()
export class LikesService {
  constructor (private readonly likeDao: LikesDao) {} // Inject `UserDao`

  async toggleLike (input: LikeEventInput, context: AuthGaurdContextDto) {
    return this.likeDao.likeToggleDao(input, context);
  }

  async getLikes (): Promise<LikeResponseDto[]> {
    return this.likeDao.getLikesDao();
  }
}
