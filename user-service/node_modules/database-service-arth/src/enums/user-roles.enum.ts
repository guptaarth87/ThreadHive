import { registerEnumType } from '@nestjs/graphql';

export enum USERROLE {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
  USER = 'USER',
}

// Register the enum with GraphQL schema
registerEnumType(USERROLE, {
  name: 'USERROLE', // This name will appear in your GraphQL Schema
});
