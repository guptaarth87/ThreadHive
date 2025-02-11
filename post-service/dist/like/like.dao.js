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
exports.LikesDao = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("database-service-arth/dist");
const drizzle_orm_1 = require("drizzle-orm");
let LikesDao = class LikesDao {
    constructor(userActivityDao) {
        this.userActivityDao = userActivityDao;
    }
    async likeToggleDao(input, context) {
        console.log('in create block');
        try {
            const inputObject = {
                type: input.type,
                typeId: input.typeId,
                likedBy: input.likedBy,
                postId: input.postId,
                count: 1,
                channelId: input.channelId,
                createdAt: new Date(),
            };
            const response = await dist_1.db
                .select()
                .from(dist_1.likes)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(dist_1.likes.type, inputObject.type), (0, drizzle_orm_1.eq)(dist_1.likes.typeId, inputObject.typeId), (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, inputObject.likedBy), (0, drizzle_orm_1.eq)(dist_1.likes.postId, inputObject.postId), (0, drizzle_orm_1.eq)(dist_1.likes.channelId, inputObject.channelId)));
            if (response.length > 0) {
                const deleteStatus = await dist_1.db
                    .delete(dist_1.likes)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(dist_1.likes.type, inputObject.type), (0, drizzle_orm_1.eq)(dist_1.likes.typeId, inputObject.typeId), (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, inputObject.likedBy), (0, drizzle_orm_1.eq)(dist_1.likes.postId, inputObject.postId), (0, drizzle_orm_1.eq)(dist_1.likes.channelId, inputObject.channelId)));
                console.log(deleteStatus);
                await this.userActivityDao.addUserActivity('unliked', context.userId, {
                    type: input.type,
                    createdAt: new Date(),
                    typeId: input.typeId.toString(),
                    likedBy: input.likedBy.toString(),
                    channelId: input.channelId.toString(),
                    postId: input.postId.toString(),
                });
                return `${inputObject.type} of id -> ${inputObject.typeId} unliked`;
            }
            const likedStatus = await dist_1.db.insert(dist_1.likes).values(inputObject);
            console.log(likedStatus);
            await this.userActivityDao.addUserActivity('liked', context.userId, {
                type: input.type,
                createdAt: new Date(),
                typeId: input.typeId.toString(),
                likedBy: input.likedBy.toString(),
                channelId: input.channelId.toString(),
                postId: input.postId.toString(),
            });
            return `liked ${inputObject.type}`;
        }
        catch (error) {
            console.log(error);
            throw new Error('Database error !');
        }
    }
    async getLikesDao() {
        try {
            const response = (await dist_1.db.select().from(dist_1.likes));
            return response;
        }
        catch (error) {
            console.log('error-->', error);
            throw new Error('Database error !');
        }
    }
};
exports.LikesDao = LikesDao;
exports.LikesDao = LikesDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.UserActivityDao])
], LikesDao);
