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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const post_dao_1 = require("./post.dao");
const cache_manager_1 = require("@nestjs/cache-manager");
let PostsService = class PostsService {
    constructor(postDao, cacheManager) {
        this.postDao = postDao;
        this.cacheManager = cacheManager;
    } // Inject `UserDao`
    async createPost(input, context) {
        const dataObject = {
            title: input.title,
            description: input.description,
            createdBy: input.createdBy,
            modifiedBy: input.createdBy,
            channelId: input.channelId,
            createdAt: new Date(),
            isDeleted: false,
        };
        return this.postDao.createPostDao(dataObject, context);
    }
    async getPosts(context) {
        // return this.postDao.getPostsDao(context);
        const cacheKey = 'all_posts';
        // Check if posts are cached
        const cachedPosts = await this.cacheManager.get(cacheKey);
        if (cachedPosts) {
            console.log('Returning cached posts...');
            return cachedPosts;
        }
        // Get posts from database
        const posts = await this.postDao.getPostsDao(context);
        // ✅ Convert `bigint` fields to `string` before caching
        const serializedPosts = posts.map(post => ({
            ...post,
            id: post.id.toString(), // Convert `bigint` fields to `string`
            createdBy: post.createdBy.toString(),
            modifiedBy: post.modifiedBy.toString(),
            channelId: post.channelId.toString(),
        }));
        await this.cacheManager.set(cacheKey, serializedPosts, 60 * 5); // 5 min cache
        return posts;
    }
    async deletePost(input, channelsAllowed, userId, role, context) {
        if (await this.postDao.canUserProceed(input.id, channelsAllowed, userId, role)) {
            return this.postDao.deletePostDao(input, context);
        }
        throw new common_1.UnauthorizedException('User not allowed to delete this post');
    }
    async updatePost(input, channelsAllowed, userId, role, context) {
        if (await this.postDao.canUserProceed(input.id, channelsAllowed, userId, role)) {
            return this.postDao.updatePost(input, context);
        }
        throw new common_1.UnauthorizedException('User not allowed to modify this post');
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [post_dao_1.PostDao, Object])
], PostsService);
