import { Module } from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CommentsResolver } from './comment.resolver';
import { CommentDao } from './comment.dao';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';

// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  providers: [CommentsService, CommentsResolver, CommentDao, AuthGuard], // Register BigIntScalar here if needed
  exports: [CommentsService],
})
export class CommentsModule {}
