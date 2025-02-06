"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChannelDao = void 0;
const dist_1 = require("database-service/dist");
const drizzle_orm_1 = require("drizzle-orm");
class UserChannelDao {
    async createUserChannelMapppingDao(input) {
        try {
            const dataObject = {
                userId: input.userId,
                channelId: input.channelId,
            };
            const newUser = await dist_1.db.insert(dist_1.usersChannelMapping).values(dataObject); // .returning() returns inserted row(s)
            if (newUser[0].affectedRows !== 0) {
                return 'ok done with status 200';
            }
            throw new Error('Check your data');
            // Return the first inserted user
        }
        catch (error) {
            console.log(error);
            throw new Error('Database error !');
        }
    }
    async getUsersChannelDao() {
        try {
            const response = (await dist_1.db
                .select()
                .from(dist_1.usersChannelMapping));
            return response;
        }
        catch (error) {
            console.log('error-->', error);
            throw new Error('Database error !');
        }
    }
    async deleteUserChannelDao(input) {
        try {
            const { id } = input;
            const response = await dist_1.db
                .delete(dist_1.usersChannelMapping)
                .where((0, drizzle_orm_1.eq)(dist_1.usersChannelMapping.id, id));
            console.log(response);
            if (response[0].affectedRows !== 0) {
                return `user mapping with if ${id} deleted successfully`;
            }
            throw new Error(`user id not found -> ${id}`);
        }
        catch (error) {
            throw new Error(`error in db with mesage -> ${error}`);
        }
    }
    async updateUserChannel(input) {
        try {
            const { id, userId, channelId } = input;
            const user = await dist_1.db
                .select()
                .from(dist_1.usersChannelMapping)
                .where((0, drizzle_orm_1.eq)(dist_1.usersChannelMapping.id, id))
                .limit(1);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            const updatedData = {};
            // Update only the fields that were provided in the input
            if (userId !== undefined) {
                updatedData.userId = userId;
            }
            if (channelId !== undefined) {
                updatedData.channelId = channelId;
            }
            updatedData.modifiedAt = new Date();
            // Save the updated user
            const response = await dist_1.db
                .update(dist_1.usersChannelMapping)
                .set(updatedData)
                .where((0, drizzle_orm_1.eq)(dist_1.usersChannelMapping.id, id));
            if (response[0].affectedRows !== 0) {
                return `user mapping of id  ${input.id} updated successfully`;
            }
            throw new Error(`user of id ${id} not updated`);
        }
        catch (error) {
            throw new Error('database error-> {error');
        }
    }
}
exports.UserChannelDao = UserChannelDao;
