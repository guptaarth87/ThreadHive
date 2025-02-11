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
exports.ReplyDao = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("database-service-arth/dist");
const drizzle_orm_1 = require("drizzle-orm");
let ReplyDao = class ReplyDao {
    constructor(userActivityDao) {
        this.userActivityDao = userActivityDao;
    } // Inject `UserDao`
    async createReplyDao(input, context) {
        console.log('in create block');
        try {
            const newReply = await dist_1.db.insert(dist_1.replies).values(input); // .returning() returns inserted row(s)
            if (newReply[0].affectedRows !== 0) {
                await this.userActivityDao.addUserActivity(context.activityDone, context.userId, input);
                return 'ok done with status 200';
            }
            throw new Error('Check your data');
            // Return the first inserted Reply
        }
        catch (error) {
            console.log(error);
            throw new Error('Database error !');
        }
    }
    async getRepliesDao(context) {
        try {
            const response = (await dist_1.db.select().from(dist_1.replies));
            await this.userActivityDao.addUserActivity(context.activityDone, context.userId, { request: 'success' });
            return response;
        }
        catch (error) {
            console.log('error-->', error);
            throw new Error('Database error !');
        }
    }
    async deleteReplyDao(input, context) {
        try {
            const { id } = input;
            const response = await dist_1.db.delete(dist_1.replies).where((0, drizzle_orm_1.eq)(dist_1.replies.id, id));
            console.log(response);
            if (response[0].affectedRows !== 0) {
                await this.userActivityDao.addUserActivity(context.activityDone, context.userId, { id: id.toString() });
                return `Reply with if ${id} deleted successfully`;
            }
            throw new Error(`Reply id not found -> ${id}`);
        }
        catch (error) {
            throw new Error(`error in db with mesage -> ${error}`);
        }
    }
    async updateReply(input, context) {
        try {
            const { id, description, channelId, postId, modifiedBy } = input;
            const Reply = await dist_1.db
                .select()
                .from(dist_1.replies)
                .where((0, drizzle_orm_1.eq)(dist_1.replies.id, id))
                .limit(1);
            if (!Reply) {
                throw new Error(`Reply with id ${id} not found`);
            }
            const updatedData = {};
            // Update only the fields that were provided in the input
            if (postId !== undefined) {
                updatedData.postId = postId;
            }
            if (description !== undefined) {
                updatedData.description = description;
            }
            if (channelId !== undefined) {
                updatedData.channelId = channelId;
            } // If password is provided, hash it
            updatedData.modifiedBy = modifiedBy;
            updatedData.modifiedAt = new Date();
            // Save the updated Reply
            const response = await dist_1.db
                .update(dist_1.replies)
                .set(updatedData)
                .where((0, drizzle_orm_1.eq)(dist_1.replies.id, id));
            if (response[0].affectedRows !== 0) {
                await this.userActivityDao.addUserActivity(context.activityDone, context.userId, { ...input, id: id.toString() });
                return `Reply of id  ${input.id} updated successfully`;
            }
            throw new Error(`Reply of id ${id} not updated`);
        }
        catch (error) {
            throw new Error('database error : {error}');
        }
    }
    async canUserProceed(entityId, channelsAllowed, userId, role) {
        if (role === 'SUPERADMIN') {
            return true;
        }
        const record = await dist_1.db.query.posts.findFirst({
            where: (posts, { eq }) => {
                return eq(posts.id, entityId);
            },
        });
        if (record) {
            if (role === 'ADMIN') {
                return channelsAllowed.includes(record.channelId);
            }
            return record.createdBy === userId;
        }
        return false;
    }
};
exports.ReplyDao = ReplyDao;
exports.ReplyDao = ReplyDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.UserActivityDao])
], ReplyDao);
