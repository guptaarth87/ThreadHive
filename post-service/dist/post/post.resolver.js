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
exports.PostsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const authGaurd_gaurds_1 = require("../gaurds/authGaurd.gaurds");
const authGuardContext_dto_1 = require("../gaurds/authGuardContext.dto");
const createPostInput_dto_1 = require("./dtos/createPostInput.dto");
const deletePostInput_dto_1 = require("./dtos/deletePostInput.dto");
const postResponse_dto_1 = require("./dtos/postResponse.dto");
const updatePostInput_dto_1 = require("./dtos/updatePostInput.dto");
const post_service_1 = require("./post.service");
let PostsResolver = class PostsResolver {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getPosts(context) {
        return this.postsService.getPosts(context);
    }
    async createpost(input, context) {
        console.log(context);
        if (context.channelsAllowed.includes(input.channelId) &&
            context.userId === input.createdBy) {
            return this.postsService.createPost(input, context);
        }
        throw new common_1.UnauthorizedException(`you dont have access to this channel -> ${input.channelId}`);
    }
    async deletepost(input, context) {
        return this.postsService.deletePost(input, context.channelsAllowed, context.userId, context.role, context); // You can access `input.id` directly
    }
    async updatepost(input, context) {
        return this.postsService.updatePost(input, context.channelsAllowed, context.userId, context.role, context); // You can access `input.id` directly
    }
};
exports.PostsResolver = PostsResolver;
__decorate([
    (0, graphql_1.Query)(() => {
        return [postResponse_dto_1.PostResponseDto];
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPosts", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPostInput_dto_1.CreatePostInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createpost", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deletePostInput_dto_1.DeletePostInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "deletepost", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePostInput_dto_1.UpdatePostInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "updatepost", null);
exports.PostsResolver = PostsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [post_service_1.PostsService])
], PostsResolver);
