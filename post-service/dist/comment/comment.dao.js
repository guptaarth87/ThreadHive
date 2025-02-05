"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentDao = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dist_1 = require("database-service/dist");
const common_1 = require("@nestjs/common");
let CommentDao = class CommentDao {
    async createCommentDao(input) {
        console.log("in create block");
        try {
            const dataObj = {
                description: input.description,
                createdBy: input.createdBy,
                modifiedBy: input.createdBy,
                postId: input.postId,
                channelId: input.channelId,
                createdAt: new Date(),
                isDeleted: false,
            };
            const newComment = await dist_1.db.insert(dist_1.comments).values(dataObj); // .returning() returns inserted row(s)
            if (newComment[0].affectedRows != 0) {
                return "ok done with status 200";
            }
            else {
                throw new Error("Check your data");
            }
            // Return the first inserted Comment
        }
        catch (error) {
            console.log(error);
            throw new Error('Database error !');
        }
    }
    async getCommentsDao() {
        try {
            const res = await dist_1.db.select().from(dist_1.comments);
            return res;
        }
        catch (error) {
            console.log("error-->", error);
            throw new Error('Database error !');
        }
    }
    async deleteCommentDao(input) {
        try {
            const { id } = input;
            const response = await dist_1.db.delete(dist_1.comments).where((0, drizzle_orm_1.eq)(dist_1.comments.id, id));
            console.log(response);
            if (response[0].affectedRows != 0) {
                return `Comment with if ${id} deleted successfully`;
            }
            else {
                throw new Error(`Comment id not found -> ${id}`);
            }
        }
        catch (error) {
            throw new Error(`error in db with mesage -> ${error}`);
        }
    }
    async updateComment(input) {
        try {
            const { id, description, channelId, postId, modifiedBy } = input;
            const Comment = await dist_1.db.select().from(dist_1.comments).where((0, drizzle_orm_1.eq)(dist_1.comments.id, id)).limit(1);
            if (!Comment) {
                throw new Error(`Comment with id ${id} not found`);
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
            // Save the updated Comment
            const response = await dist_1.db.update(dist_1.comments).set(updated_data).where((0, drizzle_orm_1.eq)(dist_1.comments.id, id));
            if (response[0].affectedRows != 0) {
                return `Comment of id  ${input.id} updated successfully`;
            }
            else {
                throw new Error(`Comment of id ${id} not updated`);
            }
        }
        catch (error) {
            throw new Error('database error');
        }
    }
};
exports.CommentDao = CommentDao;
exports.CommentDao = CommentDao = __decorate([
    (0, common_1.Injectable)()
], CommentDao);
