import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('BigInt')
export class BigIntScalar implements CustomScalar<unknown, bigint> {
  description = 'BigInt custom scalar type';

  // Parse incoming value (e.g., from variables) to BigInt
  parseValue(value: unknown): bigint {
    if (typeof value === 'string') {
      return BigInt(value); // Parse string to BigInt
    }
    throw new Error('Value must be a string for BigInt parsing');
  }

  // Serialize BigInt to string for GraphQL
  serialize(value: unknown): string {
    if (typeof value === 'bigint') {
      return value.toString(); // Serialize BigInt to string for GraphQL
    }
    throw new Error('Value must be a BigInt');
  }

  // Parse GraphQL AST literals into BigInt
  parseLiteral(ast: any): bigint {
    if (ast.kind === Kind.INT) {
      return BigInt(ast.value); // Parse value from AST into BigInt
    }
    throw new Error('AST value must be an integer for BigInt');
  }
}
