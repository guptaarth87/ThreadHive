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
exports.UserChannelService = void 0;
const common_1 = require("@nestjs/common");
const userChannel_dao_1 = require("./userChannel.dao");
let UserChannelService = class UserChannelService {
    constructor(userChannelDao) {
        this.userChannelDao = userChannelDao;
    } // Inject `UserChannelDao`
    async createUserChannelMapping(input, context) {
        return this.userChannelDao.createUserChannelMapppingDao(input, context);
    }
    async getUserChannelMapping(context) {
        return this.userChannelDao.getUsersChannelDao(context);
    }
    async deleteUserChannelMapping(input, context) {
        return this.userChannelDao.deleteUserChannelDao(input, context);
    }
    async updateUserChannelMapping(input, context) {
        return this.userChannelDao.updateUserChannel(input, context);
    }
};
exports.UserChannelService = UserChannelService;
exports.UserChannelService = UserChannelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [userChannel_dao_1.UserChannelDao])
], UserChannelService);
