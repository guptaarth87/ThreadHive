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
exports.CommentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const comment_service_1 = require("./comment.service");
const commentResponse_dto_1 = require("./dtos/commentResponse.dto");
const createCommentInput_dto_1 = require("./dtos/createCommentInput.dto");
const deleteCommentInput_dto_1 = require("./dtos/deleteCommentInput.dto");
const updateComment_dto_1 = require("./dtos/updateComment.dto");
let CommentsResolver = class CommentsResolver {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async getComments() {
        return this.commentsService.getComments();
    }
    async createComment(input) {
        return this.commentsService.createComment(input);
    }
    async deleteComment(input) {
        return this.commentsService.deleteComment(input); // You can access `input.id` directly
    }
    async updateComment(input) {
        return this.commentsService.updateComment(input); // You can access `input.id` directly
    }
};
exports.CommentsResolver = CommentsResolver;
__decorate([
    (0, graphql_1.Query)(() => [commentResponse_dto_1.CommentResponseDto]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "getComments", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCommentInput_dto_1.CreateCommentInput]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "createComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteCommentInput_dto_1.DeleteCommentInput]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "deleteComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateComment_dto_1.UpdateCommentInput]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "updateComment", null);
exports.CommentsResolver = CommentsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [comment_service_1.CommentsService])
], CommentsResolver);
