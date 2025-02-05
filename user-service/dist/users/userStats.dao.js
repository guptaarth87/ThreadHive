"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatsDao = void 0;
const dist_1 = require("database-service/dist");
const drizzle_orm_1 = require("drizzle-orm");
class userStatsDao {
    async getUserPostStats(input) {
        const { startDate, endDate, userId } = input;
        const conditions = [];
        if (startDate)
            conditions.push((0, drizzle_orm_1.gte)(dist_1.posts.createdAt, startDate));
        if (endDate)
            conditions.push((0, drizzle_orm_1.lte)(dist_1.posts.createdAt, endDate));
        if (userId)
            conditions.push((0, drizzle_orm_1.eq)(dist_1.posts.createdBy, userId));
        // Get users list based on userId condition
        const userIds = userId
            ? [userId]
            : await dist_1.db.select({ id: dist_1.users.id }).from(dist_1.users).then((res) => res.map((u) => u.id));
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
                .then((res) => res[0]?.count || 0);
            // Get total replies by user
            const totalReplies = await dist_1.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(dist_1.replies)
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.replies.createdBy, uid)))
                .then((res) => res[0]?.count || 0);
            // Get total likes on posts, comments, and replies by user
            const totalLikesOnPosts = await dist_1.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(dist_1.likes)
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, uid), (0, drizzle_orm_1.eq)(dist_1.likes.type, 'POST')))
                .then((res) => res[0]?.count || 0);
            const totalLikesOnComments = await dist_1.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(dist_1.likes)
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, uid), (0, drizzle_orm_1.eq)(dist_1.likes.type, 'COMMENT')))
                .then((res) => res[0]?.count || 0);
            const totalLikesOnReplies = await dist_1.db
                .select({ count: (0, drizzle_orm_1.count)() })
                .from(dist_1.likes)
                .where((0, drizzle_orm_1.and)(...conditions, (0, drizzle_orm_1.eq)(dist_1.likes.likedBy, uid), (0, drizzle_orm_1.eq)(dist_1.likes.type, 'REPLY')))
                .then((res) => res[0]?.count || 0);
            return {
                id: uid,
                postWithMaxLikes: postWithMaxLikes?.post || null,
                postWithMinLikes: postWithMinLikes?.post || null,
                total_comments: totalComments,
                total_replies: totalReplies,
                total_likes_on_posts: totalLikesOnPosts,
                total_likes_on_comments: totalLikesOnComments,
                total_likes_on_replies: totalLikesOnReplies,
            };
        }));
        return result;
    }
}
exports.userStatsDao = userStatsDao;
