"use strict";
// import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
// import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
// import { BigIntScalar} from 'database-service/dist'
// import { PostsModule } from './post/post.module';
// import { CommentsModule } from './comment/comment.module';
// import { RepliesModule } from './reply/reply.module';
// import { LikesModule } from './like/like.module';
// // import { db } from 'database-service/dist'; // Adjust the import path
// import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
// @Module({
//   imports: [
//     GraphQLModule.forRoot<ApolloFederationDriverConfig>({
//       driver: ApolloFederationDriver,
//       autoSchemaFile: true,
//       // path: '/graphql'
//     }), 
//     LikesModule,
//     PostsModule,
//     CommentsModule,
//     RepliesModule
//   ], // Export the db object so it can be used in other modules
//   providers: [BigIntScalar],
// })
// export class AppModule {} 
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const dist_1 = require("database-service/dist");
const post_module_1 = require("./post/post.module");
const comment_module_1 = require("./comment/comment.module");
const reply_module_1 = require("./reply/reply.module");
const like_module_1 = require("./like/like.module");
// import { db } from 'database-service/dist'; // Adjust the import path
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
            like_module_1.LikesModule,
            post_module_1.PostsModule,
            comment_module_1.CommentsModule,
            reply_module_1.RepliesModule
        ], // Export the db object so it can be used in other modules
        providers: [dist_1.BigIntScalar],
    })
], AppModule);
