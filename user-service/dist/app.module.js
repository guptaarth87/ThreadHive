"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const dist_1 = require("database-service/dist");
const auth_module_1 = require("./auth/auth.module");
const channel_module_1 = require("./channels/channel.module");
const userChannel_module_1 = require("./userChannelMapping/userChannel.module");
const user_module_1 = require("./users/user.module");
const graphql_type_json_1 = require("graphql-type-json");
// import { db } from 'database-service/dist'; // Adjust the import path
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloFederationDriver,
                autoSchemaFile: true,
                resolvers: { JSON: graphql_type_json_1.GraphQLJSON }
            }),
            channel_module_1.ChannelsModule,
            userChannel_module_1.UserChannelMappingModule,
            user_module_1.UsersModule,
            auth_module_1.AuthModule,
        ], // Export the db object so it can be used in other modules
        providers: [dist_1.BigIntScalar],
    })
], AppModule);
