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
exports.ReplyResponseDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const dist_1 = require("database-service-arth/dist");
const class_validator_1 = require("class-validator");
let ReplyResponseDto = class ReplyResponseDto {
};
exports.ReplyResponseDto = ReplyResponseDto;
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], ReplyResponseDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(10),
    __metadata("design:type", String)
], ReplyResponseDto.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], ReplyResponseDto.prototype, "modifiedBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], ReplyResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], ReplyResponseDto.prototype, "channelId", void 0);
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], ReplyResponseDto.prototype, "commentId", void 0);
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], ReplyResponseDto.prototype, "postId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], ReplyResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], ReplyResponseDto.prototype, "modifiedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], ReplyResponseDto.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], ReplyResponseDto.prototype, "isDeleted", void 0);
exports.ReplyResponseDto = ReplyResponseDto = __decorate([
    (0, graphql_1.ObjectType)()
], ReplyResponseDto);
