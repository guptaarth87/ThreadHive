import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { BigIntScalar} from 'database-service/dist'
import { ChannelsModule } from './channels/channel.module';
// import { db } from 'database-service/dist'; // Adjust the import path

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      
    }),
    ChannelsModule,
    UsersModule,
    AuthModule,
  ], // Export the db object so it can be used in other modules
  providers: [BigIntScalar],
})
export class AppModule {} 