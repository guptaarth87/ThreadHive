// import { CustomScalar, Scalar } from '@nestjs/graphql';
// import { Kind, ValueNode } from 'graphql';

// @Scalar('JSON', () => Object) // Ensures it is recognized as a JSON type
// export class JSONScalar implements CustomScalar<unknown, Record<string, any>> {
//   description = 'JSON custom scalar type';

//   parseValue(value: unknown): Record<string, any> {
//     return typeof value === 'string' ? JSON.parse(value) : value;
//   }

//   serialize(value: unknown): Record<string, any> {
//     return value as Record<string, any>;
//   }

//   parseLiteral(ast: ValueNode): Record<string, any> {
//     if (ast.kind === Kind.STRING) return JSON.parse(ast.value);
//     if (ast.kind === Kind.OBJECT) return ast as unknown as Record<string, any>;
//     throw new Error('Invalid JSON format');
//   }
// }
