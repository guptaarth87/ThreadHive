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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepliesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const updateReply_dto_1 = require("./dtos/updateReply.dto");
const deleteReply_dto_1 = require("./dtos/deleteReply.dto");
const replyComment_dto_1 = require("./dtos/replyComment.dto");
const createReply_dto_1 = require("./dtos/createReply.dto");
const reply_service_1 = require("./reply.service");
let RepliesResolver = class RepliesResolver {
    constructor(repliesService) {
        this.repliesService = repliesService;
    }
    async getReplys() {
        return this.repliesService.getReplys();
    }
    async createReply(input) {
        return this.repliesService.createReply(input);
    }
    async deleteReply(input) {
        return this.repliesService.deleteReply(input); // You can access `input.id` directly
    }
    async updateReply(input) {
        return this.repliesService.updateReply(input); // You can access `input.id` directly
    }
};
exports.RepliesResolver = RepliesResolver;
__decorate([
    (0, graphql_1.Query)(() => [replyComment_dto_1.ReplyResponseDto]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RepliesResolver.prototype, "getReplys", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createReply_dto_1.CreateReplyInput]),
    __metadata("design:returntype", Promise)
], RepliesResolver.prototype, "createReply", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteReply_dto_1.DeleteReplyInput]),
    __metadata("design:returntype", Promise)
], RepliesResolver.prototype, "deleteReply", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateReply_dto_1.UpdateReplyInput]),
    __metadata("design:returntype", Promise)
], RepliesResolver.prototype, "updateReply", null);
exports.RepliesResolver = RepliesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [reply_service_1.RepliesService])
], RepliesResolver);
