"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDao = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dist_1 = require("database-service/dist");
const common_1 = require("@nestjs/common");
let PostDao = class PostDao {
    async createPostDao(input) {
        console.log("in create block");
        try {
            const dataObj = {
                title: input.title,
                description: input.description,
                createdBy: input.createdBy,
                modifiedBy: input.createdBy,
                channelId: input.channelId,
                createdAt: new Date(),
                isDeleted: false,
            };
            const newpost = await dist_1.db.insert(dist_1.posts).values(dataObj); // .returning() returns inserted row(s)
            if (newpost[0].affectedRows != 0) {
                return "ok done with status 200";
            }
            else {
                throw new Error("Check your data");
            }
            // Return the first inserted post
        }
        catch (error) {
            console.log(error);
            throw new Error('Database error !');
        }
    }
    async getPostsDao() {
        try {
            const res = await dist_1.db.select().from(dist_1.posts);
            return res;
        }
        catch (error) {
            console.log("error-->", error);
            throw new Error('Database error !');
        }
    }
    async deletePostDao(input) {
        try {
            const { id } = input;
            const response = await dist_1.db.delete(dist_1.posts).where((0, drizzle_orm_1.eq)(dist_1.posts.id, id));
            console.log(response);
            if (response[0].affectedRows != 0) {
                return `post with if ${id} deleted successfully`;
            }
            else {
                throw new Error(`post id not found -> ${id}`);
            }
        }
        catch (error) {
            throw new Error(`error in db with mesage -> ${error}`);
        }
    }
    async updatePost(input) {
        try {
            const { id, title, description, channelId, modifiedBy } = input;
            const post = await dist_1.db.select().from(dist_1.posts).where((0, drizzle_orm_1.eq)(dist_1.posts.id, id)).limit(1);
            if (!post) {
                throw new Error(`post with id ${id} not found`);
            }
            const updated_data = {};
            // Update only the fields that were provided in the input
            if (title !== undefined)
                updated_data['title'] = title;
            if (description !== undefined)
                updated_data['description'] = description;
            if (channelId !== undefined)
                updated_data['channelId'] = channelId; // If password is provided, hash it
            updated_data['modifiedBy'] = modifiedBy;
            updated_data['modifiedAt'] = new Date();
            // Save the updated post
            const response = await dist_1.db.update(dist_1.posts).set(updated_data).where((0, drizzle_orm_1.eq)(dist_1.posts.id, id));
            if (response[0].affectedRows != 0) {
                return `post of id  ${input.id} updated successfully`;
            }
            else {
                throw new Error(`post of id ${id} not updated`);
            }
        }
        catch (error) {
            throw new Error('database error');
        }
    }
};
exports.PostDao = PostDao;
exports.PostDao = PostDao = __decorate([
    (0, common_1.Injectable)()
], PostDao);
