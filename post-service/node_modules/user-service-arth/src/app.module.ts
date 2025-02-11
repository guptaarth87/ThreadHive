import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { BigIntScalar } from 'database-service/dist';

import { AuthModule } from './auth/auth.module';
import { ChannelsModule } from './channels/channel.module';
import { UserChannelMappingModule } from './userChannelMapping/userChannel.module';
import { UsersModule } from './users/user.module';
// import { GraphQLJSON } from 'graphql-type-json';
// import { db } from 'database-service/dist'; // Adjust the import path

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
      // resolvers: { JSON: GraphQLJSON }
    }),
    ChannelsModule,
    UserChannelMappingModule,
    UsersModule,
    AuthModule,
  ], // Export the db object so it can be used in other modules
  providers: [BigIntScalar],
})
export class AppModule {}
