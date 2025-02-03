import { Module } from '@nestjs/common';
import { PostsService } from './post.service';
import { PostsResolver } from './post.resolver';
import { PostDao } from './post.dao';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  providers: [PostsService, PostsResolver, PostDao], // Register BigIntScalar here if needed
  exports: [PostsService],
})
export class PostsModule {}
