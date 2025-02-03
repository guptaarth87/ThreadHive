import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BigIntScalar} from 'database-service/dist'
import { PostsModule } from './post/post.module';
// import { db } from 'database-service/dist'; // Adjust the import path

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      
    }),
    PostsModule
  ], // Export the db object so it can be used in other modules
  providers: [BigIntScalar],
})
export class AppModule {} 