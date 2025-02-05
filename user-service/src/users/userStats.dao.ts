import { comments, db, likes, posts, replies, users } from 'database-service/dist';
import { and, eq, gte, lte, desc, asc, count, SQL } from 'drizzle-orm';
import { StatsResponseDto } from './dtos/statsResponse.dto';
import { StatsUserInput } from './dtos/statsInput.dto';

export class userStatsDao{
     async getUserPostStats(input: StatsUserInput) {
        const {startDate, endDate, userId} = input
       
        const conditions : SQL[]= [];
       
       if (startDate) conditions.push(gte(posts.createdAt, startDate));
       if (endDate) conditions.push(lte(posts.createdAt, endDate));
       if (userId) conditions.push(eq(posts.createdBy, userId));
     
       // Get users list based on userId condition
       const userIds = userId
         ? [userId]
         : await db.select({ id: users.id }).from(users).then((res) => res.map((u) => u.id));
     
       const result = await Promise.all(
         userIds.map(async (uid) => {
           // Fetch posts with max & min likes
           const [postWithMaxLikes] = await db
             .select({ post: posts })
             .from(posts)
             .leftJoin(likes, eq(posts.id, likes.postId))
             .where(and(...conditions, eq(posts.createdBy, uid)))
             .groupBy(posts.id)
             .orderBy(desc(count(likes.id)))
             .limit(1);
     
           const [postWithMinLikes] = await db
             .select({ post: posts })
             .from(posts)
             .leftJoin(likes, eq(posts.id, likes.postId))
             .where(and(...conditions, eq(posts.createdBy, uid)))
             .groupBy(posts.id)
             .orderBy(asc(count(likes.id)))
             .limit(1);
     
           // Get total comments by user
           const totalComments = await db
             .select({ count: count() })
             .from(comments)
             .where(and(...conditions, eq(comments.createdBy, uid)))
             .then((res) => res[0]?.count || 0);
     
           // Get total replies by user
           const totalReplies = await db
             .select({ count: count() })
             .from(replies)
             .where(and(...conditions, eq(replies.createdBy, uid)))
             .then((res) => res[0]?.count || 0);
     
           // Get total likes on posts, comments, and replies by user
           const totalLikesOnPosts = await db
             .select({ count: count() })
             .from(likes)
             .where(and(...conditions, eq(likes.likedBy, uid), eq(likes.type, 'POST')))
             .then((res) => res[0]?.count || 0);
     
           const totalLikesOnComments = await db
             .select({ count: count() })
             .from(likes)
             .where(and(...conditions, eq(likes.likedBy, uid), eq(likes.type, 'COMMENT')))
             .then((res) => res[0]?.count || 0);
     
           const totalLikesOnReplies = await db
             .select({ count: count() })
             .from(likes)
             .where(and(...conditions, eq(likes.likedBy, uid), eq(likes.type, 'REPLY')))
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
         })
       );
     
       return result as  StatsResponseDto[];

     }
}