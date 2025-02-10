import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthGaurdContextDto } from '../gaurds/authGuardContext.dto';
import { CreatePostInput } from './dtos/createPostInput.dto';
import { DeletePostInput } from './dtos/deletePostInput.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { UpdatePostInput } from './dtos/updatePostInput.dto';
import { PostDao } from './post.dao';

@Injectable()
export class PostsService {
  constructor (private readonly postDao: PostDao) {} // Inject `UserDao`

  async createPost (input: CreatePostInput, context: AuthGaurdContextDto) {
    const dataObject = {
      title: input.title,
      description: input.description,
      createdBy: input.createdBy,
      modifiedBy: input.createdBy,
      channelId: input.channelId,
      createdAt: new Date(),
      isDeleted: false,
    };
    return this.postDao.createPostDao(dataObject, context);
  }

  async getPosts (context: AuthGaurdContextDto): Promise<PostResponseDto[]> {
    return this.postDao.getPostsDao(context);
  }

  async deletePost (
    input: DeletePostInput,
    channelsAllowed: bigint[],
    userId: bigint,
    role: string,
    context: AuthGaurdContextDto
  ): Promise<string> {
    if (
      await this.postDao.canUserProceed(input.id, channelsAllowed, userId, role)
    ) {
      return this.postDao.deletePostDao(input, context);
    }
    throw new UnauthorizedException('User not allowed to delete this post');
  }

  async updatePost (
    input: UpdatePostInput,
    channelsAllowed: bigint[],
    userId: bigint,
    role: string,
    context: AuthGaurdContextDto
  ): Promise<string> {
    if (
      await this.postDao.canUserProceed(input.id, channelsAllowed, userId, role)
    ) {
      return this.postDao.updatePost(input, context);
    }
    throw new UnauthorizedException('User not allowed to modify this post');
  }
}
