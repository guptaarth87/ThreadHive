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
exports.RepliesService = void 0;
const common_1 = require("@nestjs/common");
const reply_dao_1 = require("./reply.dao");
let RepliesService = class RepliesService {
    constructor(replyDao) {
        this.replyDao = replyDao;
    } // Inject `UserDao`
    async createReply(input) {
        return this.replyDao.createReplyDao(input);
    }
    async getReplys() {
        return this.replyDao.getReplysDao();
    }
    async deleteReply(input) {
        return this.replyDao.deleteReplyDao(input);
    }
    async updateReply(input) {
        return this.replyDao.updateReply(input);
    }
};
exports.RepliesService = RepliesService;
exports.RepliesService = RepliesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [reply_dao_1.ReplyDao])
], RepliesService);
