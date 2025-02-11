import { CustomScalar } from '@nestjs/graphql';
export declare class BigIntScalar implements CustomScalar<unknown, bigint> {
    description: string;
    parseValue(value: unknown): bigint;
    serialize(value: unknown): string;
    parseLiteral(ast: any): bigint;
}
