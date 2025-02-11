import { UserActivityResponseDto } from './activityResponse.dto';
export declare class UserActivityDao {
    getUserActivity(): Promise<UserActivityResponseDto[]>;
    addUserActivity(activity: string, actionBy: bigint, additionalData?: Record<string, any>): Promise<boolean>;
}
