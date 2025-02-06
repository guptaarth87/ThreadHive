"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityDao = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../schema");
const db_1 = require("../db");
class UserActivityDao {
    async getUserActivity(userId) {
        try {
            const response = await db_1.db
                .select()
                .from(schema_1.activities)
                .where((0, drizzle_orm_1.eq)(schema_1.activities.actionBy, userId));
            return response;
        }
        catch (error) {
            console.log('error-->', error);
            throw new Error('Database error !');
        }
    }
    async addUserActivity(activity, actionBy, additionalData) {
        try {
            const ActivityObject = {
                activity,
                actionBy: actionBy,
                additionalData,
                createdAt: new Date(),
            };
            console.log("activity object in my activity function", ActivityObject);
            const newActivity = await db_1.db.insert(schema_1.activities).values(ActivityObject);
            console.log("new activity", newActivity);
            if (newActivity[0].affectedRows !== 0) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
exports.UserActivityDao = UserActivityDao;
//# sourceMappingURL=userActivity.dao.js.map