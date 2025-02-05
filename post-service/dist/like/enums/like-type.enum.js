"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeType = void 0;
const graphql_1 = require("@nestjs/graphql");
var LikeType;
(function (LikeType) {
    LikeType["POST"] = "POST";
    LikeType["COMMENT"] = "COMMENT";
    LikeType["REPLY"] = "REPLY";
})(LikeType || (exports.LikeType = LikeType = {}));
// Register the enum with GraphQL schema
(0, graphql_1.registerEnumType)(LikeType, {
    name: 'LikeType', // This name will appear in your GraphQL Schema
});
