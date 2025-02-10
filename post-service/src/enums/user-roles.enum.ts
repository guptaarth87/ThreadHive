import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
  USER = 'USER',
}

// Register the enum with GraphQL schema
registerEnumType(UserRole, {
  name: 'UserRole', // This name will appear in your GraphQL Schema
});
