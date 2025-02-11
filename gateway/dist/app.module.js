"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const gateway_1 = require("@apollo/gateway");
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloGatewayDriver,
                gateway: {
                    supergraphSdl: new gateway_1.IntrospectAndCompose({
                        subgraphs: [
                            { name: 'users', url: 'http://127.0.0.1:3000/graphql' }, // Replace with your user service URL
                            { name: 'posts', url: 'http://127.0.0.1:4000/graphql' }, // Replace with your post service URL
                        ],
                    }),
                    buildService: ({ url }) => {
                        return new gateway_1.RemoteGraphQLDataSource({
                            url,
                            willSendRequest({ request, context }) {
                                // Forward the Authorization header to the subgraphs
                                if (context.req && context.req.headers) {
                                    request.http?.headers.set('Authorization', context.req.headers.authorization);
                                }
                            },
                        });
                    },
                },
                // // Enable subscriptions if necessary
                // subscriptions: false,
            }),
        ],
    })
], AppModule);
