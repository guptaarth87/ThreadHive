"use strict";
// import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { UsersModule } from './users/user.module';
// import { AuthModule } from './auth/auth.module';
// import { BigIntScalar} from 'database-service/dist'
// import { ChannelsModule } from './channels/channel.module';
// import { UserChannelMappingModule } from './userChannelMapping/userChannel.module';
// // import { db } from 'database-service/dist'; // Adjust the import path
// import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// import { UsersResolver } from './users/user.resolver';
// import { UsersService } from './users/user.service';
// import { ChannelsResolver } from './channels/channel.resolver';
// import { ChannelsService } from './channels/channel.service';
// import { UserChannelResolver } from './userChannelMapping/userchannel.resolver';
// import { UserChannelService } from './userChannelMapping/userChannel.service';
// import { AuthService } from './auth/auth.service';
// import { AuthResolver } from './auth/auth.resolver';
// @Module({
//   imports: [
//     GraphQLModule.forRoot<ApolloFederationDriverConfig>({
//       driver: ApolloFederationDriver,
//       autoSchemaFile: true,
//     }),
//     ChannelsModule,
//     UserChannelMappingModule,
//     UsersModule,
//     AuthModule,
//   ], // Export the db object so it can be used in other modules
//   providers: [BigIntScalar, 
//     // UsersResolver, UsersService, ChannelsResolver, ChannelsService, UserChannelResolver,
//     // UserChannelService, AuthService, AuthResolver
//   ],
// })
// export class AppModule {} 
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_module_1 = require("./users/user.module");
const auth_module_1 = require("./auth/auth.module");
const dist_1 = require("database-service/dist");
const channel_module_1 = require("./channels/channel.module");
const userChannel_module_1 = require("./userChannelMapping/userChannel.module");
// import { db } from 'database-service/dist'; // Adjust the import path
const apollo_1 = require("@nestjs/apollo");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: true,
            }),
            channel_module_1.ChannelsModule,
            userChannel_module_1.UserChannelMappingModule,
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
        ], // Export the db object so it can be used in other modules
        providers: [dist_1.BigIntScalar,
            // UsersResolver, UsersService, ChannelsResolver, ChannelsService, UserChannelResolver,
            // UserChannelService, AuthService, AuthResolver
        ],
    })
], AppModule);
