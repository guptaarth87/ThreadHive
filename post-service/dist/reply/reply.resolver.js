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
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const authGaurd_gaurds_1 = require("../gaurds/authGaurd.gaurds");
const authGuardContext_dto_1 = require("../gaurds/authGuardContext.dto");
const createReply_dto_1 = require("./dtos/createReply.dto");
const deleteReply_dto_1 = require("./dtos/deleteReply.dto");
const replyComment_dto_1 = require("./dtos/replyComment.dto");
const updateReply_dto_1 = require("./dtos/updateReply.dto");
const reply_service_1 = require("./reply.service");
let RepliesResolver = class RepliesResolver {
    constructor(repliesService) {
        this.repliesService = repliesService;
    }
    async getReplies(context) {
        return this.repliesService.getReplies(context);
    }
    async createReply(input, context) {
        if (context.channelsAllowed.includes(input.channelId) &&
            context.userId === input.createdBy) {
            return this.repliesService.createReply(input, context);
        }
        throw new common_1.UnauthorizedException(`you dont have access to this channel -> ${input.channelId}`);
    }
    async deleteReply(input, context) {
        return this.repliesService.deleteReply(input, context.channelsAllowed, context.userId, context.role, context); // You can access `input.id` directly
    }
    async updateReply(input, context) {
        return this.repliesService.updateReply(input, context.channelsAllowed, context.userId, context.role, context); // You can access `input.id` directly
    }
};
exports.RepliesResolver = RepliesResolver;
__decorate([
    (0, graphql_1.Query)(() => {
        return [replyComment_dto_1.ReplyResponseDto];
    }),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], RepliesResolver.prototype, "getReplies", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createReply_dto_1.CreateReplyInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], RepliesResolver.prototype, "createReply", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteReply_dto_1.DeleteReplyInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], RepliesResolver.prototype, "deleteReply", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateReply_dto_1.UpdateReplyInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], RepliesResolver.prototype, "updateReply", null);
exports.RepliesResolver = RepliesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [reply_service_1.RepliesService])
], RepliesResolver);
