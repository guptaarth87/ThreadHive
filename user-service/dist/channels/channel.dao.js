"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelDao = void 0;
const dist_1 = require("database-service/dist");
const drizzle_orm_1 = require("drizzle-orm");
class ChannelDao {
    formatDateForMySQL(dateString) {
        const [day, month, year] = dateString.split('-');
        const date = new Date(`${year}-${month}-${day}`);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    }
    async createChannelDao(input) {
        console.log('in create block');
        try {
            const dataObject = {
                name: input.name,
                createdAt: new Date(),
                isDeleted: false,
            };
            const newChannel = await dist_1.db.insert(dist_1.channels).values(dataObject); // .returning() returns inserted row(s)
            if (newChannel[0].affectedRows !== 0) {
                return 'ok done with status 200';
            }
            throw new Error('Check your data');
            // Return the first inserted channel
        }
        catch (error) {
            console.log(error);
            throw new Error('Database error !');
        }
    }
    async getChannelsDao() {
        try {
            const response = (await dist_1.db
                .select()
                .from(dist_1.channels));
            return response;
        }
        catch (error) {
            console.log('error-->', error);
            throw new Error('Database error !');
        }
    }
    async deleteChannelDao(input) {
        try {
            const { id } = input;
            const response = await dist_1.db.delete(dist_1.channels).where((0, drizzle_orm_1.eq)(dist_1.channels.id, id));
            console.log(response);
            if (response[0].affectedRows !== 0) {
                return `channel with if ${id} deleted successfully`;
            }
            throw new Error(`channel id not found -> ${id}`);
        }
        catch (error) {
            throw new Error(`error in db with mesage -> ${error}`);
        }
    }
    async updateChannel(input) {
        try {
            const { id, name } = input;
            const channel = await dist_1.db
                .select()
                .from(dist_1.channels)
                .where((0, drizzle_orm_1.eq)(dist_1.channels.id, id))
                .limit(1);
            if (!channel) {
                throw new Error(`channel with id ${id} not found`);
            }
            const updatedData = {};
            // Update only the fields that were provided in the input
            if (name !== undefined) {
                updatedData.name = name;
            }
            updatedData.modifiedAt = new Date();
            // Save the updated channel
            const response = await dist_1.db
                .update(dist_1.channels)
                .set(updatedData)
                .where((0, drizzle_orm_1.eq)(dist_1.channels.id, id));
            if (response[0].affectedRows !== 0) {
                return `channel of id  ${input.id} updated successfully`;
            }
            throw new Error(`channel of id ${id} not updated`);
        }
        catch (error) {
            throw new Error(`database error-> ${error}`);
        }
    }
}
exports.ChannelDao = ChannelDao;
