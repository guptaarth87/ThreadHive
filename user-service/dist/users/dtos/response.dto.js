"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const dist_1 = require("database-service/dist");
// @Directive('@key(fields: "id")')
let UserResponseDto = class UserResponseDto {
};
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], UserResponseDto.prototype, "role", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "dob", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], UserResponseDto.prototype, "modifiedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], UserResponseDto.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], UserResponseDto.prototype, "isDeleted", void 0);
exports.UserResponseDto = UserResponseDto = __decorate([
    (0, graphql_1.ObjectType)()
], UserResponseDto);
