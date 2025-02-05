import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { BigIntScalar} from 'database-service/dist'
import { ChannelsModule } from './channels/channel.module';
import { UserChannelMappingModule } from './userChannelMapping/userChannel.module';
// import { db } from 'database-service/dist'; // Adjust the import path
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';

import { UsersResolver } from './users/user.resolver';
import { UsersService } from './users/user.service';
import { ChannelsResolver } from './channels/channel.resolver';
import { ChannelsService } from './channels/channel.service';
import { UserChannelResolver } from './userChannelMapping/userchannel.resolver';
import { UserChannelService } from './userChannelMapping/userChannel.service';
import { AuthService } from './auth/auth.service';
import { AuthResolver } from './auth/auth.resolver';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
     
    })
   ,
    ChannelsModule,
    UserChannelMappingModule,
    UsersModule,
    AuthModule,
  ], // Export the db object so it can be used in other modules
  providers: [BigIntScalar, 

   
    // UsersResolver, UsersService, ChannelsResolver, ChannelsService, UserChannelResolver,
    // UserChannelService, AuthService, AuthResolver
  ],
})
export class AppModule {} 
