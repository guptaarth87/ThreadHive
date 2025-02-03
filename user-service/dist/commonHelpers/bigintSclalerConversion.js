"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigIntScalar = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let BigIntScalar = class BigIntScalar {
    constructor() {
        this.description = 'BigInt custom scalar type';
    }
    // Parse incoming value (e.g., from variables) to BigInt
    parseValue(value) {
        if (typeof value === 'string') {
            return BigInt(value); // Parse string to BigInt
        }
        throw new Error('Value must be a string for BigInt parsing');
    }
    // Serialize BigInt to string for GraphQL
    serialize(value) {
        if (typeof value === 'bigint') {
            return value.toString(); // Serialize BigInt to string for GraphQL
        }
        throw new Error('Value must be a BigInt');
    }
    // Parse GraphQL AST literals into BigInt
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.INT) {
            return BigInt(ast.value); // Parse value from AST into BigInt
        }
        throw new Error('AST value must be an integer for BigInt');
    }
};
exports.BigIntScalar = BigIntScalar;
exports.BigIntScalar = BigIntScalar = __decorate([
    (0, graphql_1.Scalar)('BigInt')
], BigIntScalar);
