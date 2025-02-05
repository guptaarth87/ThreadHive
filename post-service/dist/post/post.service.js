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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const post_dao_1 = require("./post.dao");
let PostsService = class PostsService {
    constructor(postDao) {
        this.postDao = postDao;
    } // Inject `UserDao`
    async createPost(input) {
        return this.postDao.createPostDao(input);
    }
    async getPosts() {
        return this.postDao.getPostsDao();
    }
    async deletePost(input) {
        return this.postDao.deletePostDao(input);
    }
    async updatePost(input) {
        return this.postDao.updatePost(input);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [post_dao_1.PostDao])
], PostsService);
