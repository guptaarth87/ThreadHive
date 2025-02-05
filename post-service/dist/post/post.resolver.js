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
const graphql_1 = require("@nestjs/graphql");
const post_service_1 = require("./post.service");
const postResponse_dto_1 = require("./dtos/postResponse.dto");
const createPostInput_dto_1 = require("./dtos/createPostInput.dto");
const deletePostInput_dto_1 = require("./dtos/deletePostInput.dto");
const updatePostInput_dto_1 = require("./dtos/updatePostInput.dto");
let PostsResolver = class PostsResolver {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getPosts() {
        return this.postsService.getPosts();
    }
    async createpost(input) {
        return this.postsService.createPost(input);
    }
    async deletepost(input) {
        return this.postsService.deletePost(input); // You can access `input.id` directly
    }
    async updatepost(input) {
        return this.postsService.updatePost(input); // You can access `input.id` directly
    }
};
exports.PostsResolver = PostsResolver;
__decorate([
    (0, graphql_1.Query)(() => [postResponse_dto_1.PostResponseDto]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPosts", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createPostInput_dto_1.CreatePostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createpost", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deletePostInput_dto_1.DeletePostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "deletepost", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePostInput_dto_1.UpdatePostInput]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "updatepost", null);
exports.PostsResolver = PostsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [post_service_1.PostsService])
], PostsResolver);
