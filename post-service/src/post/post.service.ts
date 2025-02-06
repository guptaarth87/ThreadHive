import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePostInput } from './dtos/createPostInput.dto';
import { DeletePostInput } from './dtos/deletePostInput.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { UpdatePostInput } from './dtos/updatePostInput.dto';
import { PostDao } from './post.dao';

@Injectable()
export class PostsService {
  constructor (private readonly postDao: PostDao) {} // Inject `UserDao`

  async createPost (input: CreatePostInput) {
    const dataObject = {
      title: input.title,
      description: input.description,
      createdBy: input.createdBy,
      modifiedBy: input.createdBy,
      channelId: input.channelId,
      createdAt: new Date(),
      isDeleted: false,
    };
    return this.postDao.createPostDao(dataObject);
  }

  async getPosts (): Promise<PostResponseDto[]> {
    return this.postDao.getPostsDao();
  }

  async deletePost (
    input: DeletePostInput,
    channelsAllowed: bigint[],
    userId: bigint,
    role: string
  ): Promise<string> {
    if (
      await this.postDao.canUserProceed(input.id, channelsAllowed, userId, role)
    ) {
      return this.postDao.deletePostDao(input);
    }
    throw new UnauthorizedException('User not allowed to delete this post');
  }

  async updatePost (
    input: UpdatePostInput,
    channelsAllowed: bigint[],
    userId: bigint,
    role: string
  ): Promise<string> {
    if (
      await this.postDao.canUserProceed(input.id, channelsAllowed, userId, role)
    ) {
      return this.postDao.updatePost(input);
    }
    throw new UnauthorizedException('User not allowed to modify this post');
  }
}
