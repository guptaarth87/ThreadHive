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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const comment_dao_1 = require("./comment.dao");
let CommentsService = class CommentsService {
    constructor(commentDao) {
        this.commentDao = commentDao;
    } // Inject `UserDao`
    async createComment(input, context) {
        const dataObject = {
            description: input.description,
            createdBy: input.createdBy,
            modifiedBy: input.createdBy,
            postId: input.postId,
            channelId: input.channelId,
            createdAt: new Date(),
            isDeleted: false,
        };
        return this.commentDao.createCommentDao(dataObject, context);
    }
    async getComments(context) {
        return this.commentDao.getCommentsDao(context);
    }
    async deleteComment(input, channelsAllowed, userId, role, context) {
        if (await this.commentDao.canUserProceed(input.id, channelsAllowed, userId, role)) {
            return this.commentDao.deleteCommentDao(input, context);
        }
        throw new common_1.UnauthorizedException('User not allowed to delete this post');
    }
    async updateComment(input, channelsAllowed, userId, role, context) {
        if (await this.commentDao.canUserProceed(input.id, channelsAllowed, userId, role)) {
            return this.commentDao.updateComment(input, context);
        }
        throw new common_1.UnauthorizedException('User not allowed to delete this post');
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comment_dao_1.CommentDao])
], CommentsService);
