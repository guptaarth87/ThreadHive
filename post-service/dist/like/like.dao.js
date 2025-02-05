"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesDao = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dist_1 = require("database-service/dist");
const common_1 = require("@nestjs/common");
let LikesDao = class LikesDao {
    async likeToggleDao(input) {
        console.log("in create block");
        try {
            const inputObj = {
                type: input.type,
                typeId: input.typeId,
                likedBy: input.likedBy,
                postId: input.postId,
                count: 1,
                channelId: input.channelId,
                createdAt: new Date(),
            };
            const response = await dist_1.db.select()
                .from(dist_1.likes)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(dist_1.likes.type, inputObj.type), (0, drizzle_orm_1.eq)(dist_1.likes.typeId, inputObj.typeId), (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, inputObj.likedBy), (0, drizzle_orm_1.eq)(dist_1.likes.postId, inputObj.postId), (0, drizzle_orm_1.eq)(dist_1.likes.channelId, inputObj.channelId)));
            if (response.length > 0) {
                const delete_status = await dist_1.db.delete(dist_1.likes)
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(dist_1.likes.type, inputObj.type), (0, drizzle_orm_1.eq)(dist_1.likes.typeId, inputObj.typeId), (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, inputObj.likedBy), (0, drizzle_orm_1.eq)(dist_1.likes.postId, inputObj.postId), (0, drizzle_orm_1.eq)(dist_1.likes.channelId, inputObj.channelId)));
                console.log(delete_status);
                return `${inputObj.type} of id -> ${inputObj.typeId} unliked`;
            }
            else {
                const liked_status = await dist_1.db.insert(dist_1.likes).values(inputObj);
                console.log(liked_status);
                return `liked ${inputObj.type}`;
            }
        }
        catch (error) {
            console.log(error);
            throw new Error('Database error !');
        }
    }
    async getLikesDao() {
        try {
            const res = await dist_1.db
                .select()
                .from(dist_1.likes);
            return res;
        }
        catch (error) {
            console.log("error-->", error);
            throw new Error('Database error !');
        }
    }
};
exports.LikesDao = LikesDao;
exports.LikesDao = LikesDao = __decorate([
    (0, common_1.Injectable)()
], LikesDao);
