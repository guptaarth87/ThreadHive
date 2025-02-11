import { registerEnumType } from '@nestjs/graphql';

export enum LIKETYPE {
  POST = 'POST',
  COMMENT = 'COMMENT',
  REPLY = 'REPLY',
}

// Register the enum with GraphQL schema
registerEnumType(LIKETYPE, {
  name: 'LIKETYPE', // This name will appear in your GraphQL Schema
});
