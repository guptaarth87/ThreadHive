import { eq } from 'drizzle-orm';
import { UserActivityResponseDto } from './activityResponse.dto';
import { activities } from '../schema';
import { db } from '../db';

export class UserActivityDao {
  async getUserActivity(userId: bigint): Promise<UserActivityResponseDto[]> {
    // Implement logic to fetch user activity based on userId
    try {
      const response = await db
        .select()
        .from(activities)
        .where(eq(activities.actionBy, userId));
      return response as UserActivityResponseDto[];
    } catch (error) {
      console.log('error-->', error);
      throw new Error('Database error !');
    }
  }

  async addUserActivity(
    activity: string,
    actionBy: bigint,
    additionalData?: Record<string, any>
  ): Promise<boolean> {
    try {
      const ActivityObject = {
        activity,
        actionBy: actionBy,
        additionalData,
        createdAt: new Date(),
      };
      console.log("activity object in my activity function",ActivityObject);
      const newActivity = await db.insert(activities).values(ActivityObject);
      console.log("new activity",newActivity);
      if (newActivity[0].affectedRows !== 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
