import { Injectable } from '@nestjs/common';
import { PostDao } from './post.dao';
import { CreatePostInput } from './dtos/createPostInput.dto';
import { PostResponseDto } from './dtos/postResponse.dto';
import { DeletePostInput } from './dtos/deletePostInput.dto';
import { UpdatePostInput } from './dtos/updatePostInput.dto';




@Injectable()
export class PostsService {
  constructor(private readonly postDao: PostDao) {} // Inject `UserDao`

  async createPost(input: CreatePostInput) {
    return this.postDao.createPostDao(input);
  }

 

  async getPosts():Promise<PostResponseDto[]> {
    return this.postDao.getPostsDao();
  }

  async deletePost(input: DeletePostInput): Promise<string>{
    return this.postDao.deletePostDao(input)
  }

  async updatePost(input: UpdatePostInput): Promise<string>{
    return this.postDao.updatePost(input)
  }
}
