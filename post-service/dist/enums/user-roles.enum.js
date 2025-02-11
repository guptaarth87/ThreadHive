"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const graphql_1 = require("@nestjs/graphql");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["SUPERADMIN"] = "SUPERADMIN";
    UserRole["USER"] = "USER";
})(UserRole || (exports.UserRole = UserRole = {}));
// Register the enum with GraphQL schema
(0, graphql_1.registerEnumType)(UserRole, {
    name: 'UserRole', // This name will appear in your GraphQL Schema
});
