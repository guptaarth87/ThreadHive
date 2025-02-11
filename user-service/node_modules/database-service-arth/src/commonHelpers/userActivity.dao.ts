import { activities } from '../schema';
import { db } from '../db';
import { UserActivityResponseDto } from './activityResponse.dto';


export class UserActivityDao {
  async getUserActivity(): Promise<UserActivityResponseDto[]> {
    // Implement logic to fetch user activity based on userId
    try {
      let response = await db.select().from(activities);
      response = response.map((activityObject) => ({
        ...activityObject,
        additionalData: JSON.stringify(activityObject.additionalData),
      }));

      console.log('activity data', response);
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
      console.log('activity object in my activity function', ActivityObject);
      const newActivity = await db.insert(activities).values(ActivityObject);
      console.log('new activity', newActivity);
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
