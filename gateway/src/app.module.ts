import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose } from '@apollo/gateway';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
     
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            { name: 'users', url: 'http://127.0.0.1:3000/graphql' }, // Replace with your user service URL
            { name: 'posts', url: 'http://127.0.0.1:4000/graphql' }, // Replace with your post service URL
          ],
        }),
      },
      // // Enable subscriptions if necessary
      // subscriptions: false,
    }),
  ],
})
export class AppModule {}
