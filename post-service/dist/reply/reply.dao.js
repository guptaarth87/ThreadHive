"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyDao = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dist_1 = require("database-service/dist");
const common_1 = require("@nestjs/common");
let ReplyDao = class ReplyDao {
    async createReplyDao(input) {
        console.log("in create block");
        try {
            const dataObj = {
                description: input.description,
                createdBy: input.createdBy,
                modifiedBy: input.createdBy,
                commentId: input.commentId,
                postId: input.postId,
                channelId: input.channelId,
                createdAt: new Date(),
                isDeleted: false,
            };
            const newReply = await dist_1.db.insert(dist_1.replies).values(dataObj); // .returning() returns inserted row(s)
            if (newReply[0].affectedRows != 0) {
                return "ok done with status 200";
            }
            else {
                throw new Error("Check your data");
            }
            // Return the first inserted Reply
        }
        catch (error) {
            console.log(error);
            throw new Error('Database error !');
        }
    }
    async getReplysDao() {
        try {
            const res = await dist_1.db.select().from(dist_1.replies);
            return res;
        }
        catch (error) {
            console.log("error-->", error);
            throw new Error('Database error !');
        }
    }
    async deleteReplyDao(input) {
        try {
            const { id } = input;
            const response = await dist_1.db.delete(dist_1.replies).where((0, drizzle_orm_1.eq)(dist_1.replies.id, id));
            console.log(response);
            if (response[0].affectedRows != 0) {
                return `Reply with if ${id} deleted successfully`;
            }
            else {
                throw new Error(`Reply id not found -> ${id}`);
            }
        }
        catch (error) {
            throw new Error(`error in db with mesage -> ${error}`);
        }
    }
    async updateReply(input) {
        try {
            const { id, description, channelId, postId, modifiedBy } = input;
            const Reply = await dist_1.db.select().from(dist_1.replies).where((0, drizzle_orm_1.eq)(dist_1.replies.id, id)).limit(1);
            if (!Reply) {
                throw new Error(`Reply with id ${id} not found`);
            }
            const updated_data = {};
            // Update only the fields that were provided in the input
            if (postId !== undefined)
                updated_data['postId'] = postId;
            if (description !== undefined)
                updated_data['description'] = description;
            if (channelId !== undefined)
                updated_data['channelId'] = channelId; // If password is provided, hash it
            updated_data['modifiedBy'] = modifiedBy;
            updated_data['modifiedAt'] = new Date();
            // Save the updated Reply
            const response = await dist_1.db.update(dist_1.replies).set(updated_data).where((0, drizzle_orm_1.eq)(dist_1.replies.id, id));
            if (response[0].affectedRows != 0) {
                return `Reply of id  ${input.id} updated successfully`;
            }
            else {
                throw new Error(`Reply of id ${id} not updated`);
            }
        }
        catch (error) {
            throw new Error('database error');
        }
    }
};
exports.ReplyDao = ReplyDao;
exports.ReplyDao = ReplyDao = __decorate([
    (0, common_1.Injectable)()
], ReplyDao);
