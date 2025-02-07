import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';
import { PostDao } from './post.dao';
import { PostsResolver } from './post.resolver';
import { PostsService } from './post.service';
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here
import 'dotenv/config';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWTSECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [PostsService, PostsResolver, PostDao, AuthGuard], // Register BigIntScalar here if needed
  exports: [PostsService],
})
export class PostsModule {}
