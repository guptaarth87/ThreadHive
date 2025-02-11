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
exports.userStatsDao = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("database-service-arth/dist");
const drizzle_orm_1 = require("drizzle-orm");
let userStatsDao = class userStatsDao {
    constructor(userActivityDao) {
        this.userActivityDao = userActivityDao;
    }
    async getUserPostStats(input, context) {
        const { startDate, endDate, userId } = input;
        const conditions = [];
        if (startDate) {
            conditions.push((0, drizzle_orm_1.gte)(dist_1.posts.createdAt, startDate));
        }
        if (endDate) {
            conditions.push((0, drizzle_orm_1.lte)(dist_1.posts.createdAt, endDate));
        }
        if (userId) {
            conditions.push((0, drizzle_orm_1.eq)(dist_1.posts.createdBy, userId));
        }
        // Get users list based on userId condition
        const userIds = userId
            ? [userId]
            : await dist_1.db
                .select({ id: dist_1.users.id })
                .from(dist_1.users)
                .then((response) => {
                return response.map((u) => {
                    return u.id;
                });
            });
        const result = await Promise.all(userIds.map(async (uid) => {
            // Fetch posts with max & min likes
            const [postWithMaxLikes] = await dist_1.db
                .select({ post: dist_1.posts })
                .from(dist_1.posts)
                .leftJoin(dist_1.likes, (0, drizzle_orm_1.eq)(dist_1.posts.id, dist_1.likes.postId))
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.posts.createdBy, uid)))
                .groupBy(dist_1.posts.id)
                .orderBy((0, drizzle_orm_1.desc)((0, drizzle_orm_1.count)(dist_1.likes.id)))
                .limit(1);
            const [postWithMinLikes] = await dist_1.db
                .select({ post: dist_1.posts })
                .from(dist_1.posts)
                .leftJoin(dist_1.likes, (0, drizzle_orm_1.eq)(dist_1.posts.id, dist_1.likes.postId))
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.posts.createdBy, uid)))
                .groupBy(dist_1.posts.id)
                .orderBy((0, drizzle_orm_1.asc)((0, drizzle_orm_1.count)(dist_1.likes.id)))
                .limit(1);
            // Get total comments by user
            const totalComments = await dist_1.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(dist_1.comments)
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.comments.createdBy, uid)))
                .then((response) => {
                return response[0]?.count || 0;
            });
            // Get total replies by user
            const totalReplies = await dist_1.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(dist_1.replies)
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.replies.createdBy, uid)))
                .then((response) => {
                return response[0]?.count || 0;
            });
            // Get total likes on posts, comments, and replies by user
            const totalLikesOnPosts = await dist_1.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(dist_1.likes)
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, uid), (0, drizzle_orm_1.eq)(dist_1.likes.type, 'POST')))
                .then((response) => {
                return response[0]?.count || 0;
            });
            const totalLikesOnComments = await dist_1.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(dist_1.likes)
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, uid), (0, drizzle_orm_1.eq)(dist_1.likes.type, 'COMMENT')))
                .then((response) => {
                return response[0]?.count || 0;
            });
            const totalLikesOnReplies = await dist_1.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(dist_1.likes)
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, uid), (0, drizzle_orm_1.eq)(dist_1.likes.type, 'REPLY')))
                .then((response) => {
                return response[0]?.count || 0;
            });
            this.userActivityDao.addUserActivity(context.activityDone, context.userId, { request: 'success' });
            return {
                id: uid,
                postWithMaxLikes: postWithMaxLikes.post || undefined,
                postWithMinLikes: postWithMinLikes.post || undefined,
                totalComments,
                totalReplies,
                totalLikesOnPosts,
                totalLikesOnComments,
                totalLikesOnReplies,
            };
        }));
        return result;
    }
};
exports.userStatsDao = userStatsDao;
exports.userStatsDao = userStatsDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.UserActivityDao])
], userStatsDao);
