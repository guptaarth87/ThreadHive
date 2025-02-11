import { registerEnumType } from '@nestjs/graphql';

// NOT IN USE FOR NOW
export enum TABLENAME {
  ACTIVITIES = 'ACTIVITIES',
  COMMENTS = 'COMMENTS',
  LIKES = 'LIKES',
  REPLIES = 'REPLIES',
  USERS = 'USERS',
  POSTS = 'POSTS',
  CHANNELS = 'CHANNELS',
  USERCHANNELMAPPING= 'USERCHANNELMAPPING',
}

// Register the enum with GraphQL schema
registerEnumType(TABLENAME, {
  name: 'TABLENAME', // This name will appear in your GraphQL Schema
});