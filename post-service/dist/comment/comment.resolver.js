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
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const authGaurd_gaurds_1 = require("../gaurds/authGaurd.gaurds");
const authGuardContext_dto_1 = require("../gaurds/authGuardContext.dto");
const comment_service_1 = require("./comment.service");
const commentResponse_dto_1 = require("./dtos/commentResponse.dto");
const createCommentInput_dto_1 = require("./dtos/createCommentInput.dto");
const deleteCommentInput_dto_1 = require("./dtos/deleteCommentInput.dto");
const updateComment_dto_1 = require("./dtos/updateComment.dto");
let CommentsResolver = class CommentsResolver {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async getComments(context) {
        return this.commentsService.getComments(context);
    }
    async createComment(input, context) {
        if (context.channelsAllowed.includes(input.channelId) &&
            context.userId === input.createdBy) {
            return this.commentsService.createComment(input, context);
        }
        throw new common_1.UnauthorizedException(`you dont have access to this channel -> ${input.channelId}`);
    }
    async deleteComment(input, context) {
        return this.commentsService.deleteComment(input, context.channelsAllowed, context.userId, context.role, context); // You can access `input.id` directly
    }
    async updateComment(input, context) {
        return this.commentsService.updateComment(input, context.channelsAllowed, context.userId, context.role, context); // You can access `input.id` directly
    }
};
exports.CommentsResolver = CommentsResolver;
__decorate([
    (0, graphql_1.Query)(() => {
        return [commentResponse_dto_1.CommentResponseDto];
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "getComments", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCommentInput_dto_1.CreateCommentInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "createComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteCommentInput_dto_1.DeleteCommentInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "deleteComment", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateComment_dto_1.UpdateCommentInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], CommentsResolver.prototype, "updateComment", null);
exports.CommentsResolver = CommentsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [comment_service_1.CommentsService])
], CommentsResolver);
