import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';
import { CommentsModule } from './comment/comment.module';
import { LikesModule } from './like/like.module';
import { PostsModule } from './post/post.module';
import { RepliesModule } from './reply/reply.module';
// import { db } from 'database-service/dist'; // Adjust the import path
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      // path: '/graphql'
    }),
    LikesModule,
    PostsModule,
    CommentsModule,
    RepliesModule,
  ], // Export the db object so it can be used in other modules
  providers: [BigIntScalar],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { BigIntScalar} from 'database-service/dist'
// import { PostsModule } from './post/post.module';
// import { CommentsModule } from './comment/comment.module';
// import { RepliesModule } from './reply/reply.module';
// import { LikesModule } from './like/like.module';
// // import { db } from 'database-service/dist'; // Adjust the import path

// @Module({
//   imports: [
//     GraphQLModule.forRoot<ApolloDriverConfig>({
//       driver: ApolloDriver,
//       autoSchemaFile: true,

//     }),
//     LikesModule,
//     PostsModule,
//     CommentsModule,
//     RepliesModule
//   ], // Export the db object so it can be used in other modules
//   providers: [BigIntScalar],
// })
// export class AppModule {}
