import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { CommentDao } from './comment.dao';
import { CommentsResolver } from './comment.resolver';
import { CommentsService } from './comment.service';

// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [CommentsService, CommentsResolver, CommentDao, AuthGuard], // Register BigIntScalar here if needed
  exports: [CommentsService],
})
export class CommentsModule {}
