"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChannelDao = void 0;
const drizzle_orm_1 = require("drizzle-orm");
// Ensure correct import
const dist_1 = require("database-service/dist");
class UserChannelDao {
    async createUserChannelMapppingDao(input) {
        try {
            const dataObj = {
                userId: input.userId,
                channelId: input.channelId
            };
            const newUser = await dist_1.db.insert(dist_1.usersChannelMapping).values(dataObj); // .returning() returns inserted row(s)
            if (newUser[0].affectedRows != 0) {
                return "ok done with status 200";
            }
            else {
                throw new Error("Check your data");
            }
            // Return the first inserted user
        }
        catch (error) {
            console.log(error);
            throw new Error('Database error !');
        }
    }
    async getUsersChannelDao() {
        try {
            const res = await dist_1.db.select().from(dist_1.usersChannelMapping);
            return res;
        }
        catch (error) {
            console.log("error-->", error);
            throw new Error('Database error !');
        }
    }
    async deleteUserChannelDao(input) {
        try {
            const { id } = input;
            const response = await dist_1.db.delete(dist_1.usersChannelMapping).where((0, drizzle_orm_1.eq)(dist_1.usersChannelMapping.id, id));
            console.log(response);
            if (response[0].affectedRows != 0) {
                return `user mapping with if ${id} deleted successfully`;
            }
            else {
                throw new Error(`user id not found -> ${id}`);
            }
        }
        catch (error) {
            throw new Error(`error in db with mesage -> ${error}`);
        }
    }
    async updateUserChannel(input) {
        try {
            const { id, userId, channelId } = input;
            const user = await dist_1.db.select().from(dist_1.usersChannelMapping).where((0, drizzle_orm_1.eq)(dist_1.usersChannelMapping.id, id)).limit(1);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            const updated_data = {};
            // Update only the fields that were provided in the input
            if (userId !== undefined)
                updated_data['userId'] = userId;
            if (channelId !== undefined)
                updated_data['channelId'] = channelId;
            updated_data['modifiedAt'] = new Date();
            // Save the updated user
            const response = await dist_1.db.update(dist_1.usersChannelMapping).set(updated_data).where((0, drizzle_orm_1.eq)(dist_1.usersChannelMapping.id, id));
            if (response[0].affectedRows != 0) {
                return `user mapping of id  ${input.id} updated successfully`;
            }
            else {
                throw new Error(`user of id ${id} not updated`);
            }
        }
        catch (error) {
            throw new Error('database error');
        }
    }
}
exports.UserChannelDao = UserChannelDao;
