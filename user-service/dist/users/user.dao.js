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
exports.UserDao = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const dist_1 = require("database-service/dist"); // Ensure correct import
const drizzle_orm_1 = require("drizzle-orm");
let UserDao = class UserDao {
    constructor(userActivityDao) {
        this.userActivityDao = userActivityDao;
    }
    async createUserDao(input, context) {
        console.log('in create block');
        try {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const dataObject = {
                name: input.name,
                email: input.email,
                password: hashedPassword,
                role: input.role,
                dob: input.dob,
                createdAt: new Date(),
                isDeleted: false,
            };
            const newUser = await dist_1.db.insert(dist_1.users).values(dataObject); // .returning() returns inserted row(s)
            if (newUser[0].affectedRows !== 0) {
                console.log(context.activityDone);
                this.userActivityDao.addUserActivity(context.activityDone, context.userId, dataObject);
                return 'ok done with status 200';
            }
            throw new Error('Check your data');
            // Return the first inserted user
        }
        catch (error) {
            console.log(error);
            throw new Error(`Database error -> ${error}`);
        }
    }
    async findUserByEmailDao(email, context) {
        try {
            const user = await dist_1.db
                .select()
                .from(dist_1.users)
                .where((0, drizzle_orm_1.eq)(dist_1.users.email, email))
                .limit(1);
            console.log(user);
            await this.userActivityDao.addUserActivity(context.activityDone, context.userId, user[0]);
            return user;
        }
        catch (error) {
            console.log('error-->', error);
            throw new Error('Database error !');
        }
    }
    async getUsersDao(context) {
        try {
            const response = (await dist_1.db.select().from(dist_1.users));
            await this.userActivityDao.addUserActivity(context.activityDone, context.userId, { "request": "success" });
            return response;
        }
        catch (error) {
            console.log('error-->', error);
            throw new Error('Database error !');
        }
    }
    async deleteUserDao(input, role, context, channels) {
        const { id } = input;
        const userChannel = await dist_1.db
            .select({ channelId: dist_1.usersChannelMapping.channelId })
            .from(dist_1.usersChannelMapping)
            .where((0, drizzle_orm_1.eq)(dist_1.usersChannelMapping.userId, id));
        const userBelongsToChannel = userChannel[0]?.channelId;
        if (role === 'ADMIN' && !channels?.includes(userBelongsToChannel)) {
            throw new common_1.UnauthorizedException(`You dont have rights to this channel of id ${userBelongsToChannel}`);
        }
        else {
            try {
                const { id } = input;
                const response = await dist_1.db.delete(dist_1.users).where((0, drizzle_orm_1.eq)(dist_1.users.id, id));
                // const response = [{'affectedRows':1}]
                console.log(input);
                await this.userActivityDao.addUserActivity(context.activityDone, context.userId, { 'id': id.toString() });
                console.log(response);
                if (response[0].affectedRows !== 0) {
                    return `user with id ${id} deleted successfully`;
                }
                throw new Error(`user id not found -> ${id}`);
            }
            catch (error) {
                throw new Error(`error in db with mesage -> ${error}`);
            }
        }
    }
    async updateUser(input, context) {
        try {
            const { id, name, email, password, role, dob } = input;
            const user = await dist_1.db
                .select()
                .from(dist_1.users)
                .where((0, drizzle_orm_1.eq)(dist_1.users.id, id))
                .limit(1);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            const updatedData = {};
            // Update only the fields that were provided in the input
            if (name !== undefined) {
                updatedData.name = name;
            }
            if (email !== undefined) {
                updatedData.email = email;
            }
            if (password !== undefined) {
                updatedData.password = await bcrypt.hash(password, 10);
            } // If password is provided, hash it
            if (role !== undefined) {
                updatedData.role = role;
            }
            if (dob !== undefined) {
                updatedData.dob = dob;
            }
            updatedData.modifiedAt = new Date();
            // Save the updated user
            const response = await dist_1.db
                .update(dist_1.users)
                .set(updatedData)
                .where((0, drizzle_orm_1.eq)(dist_1.users.id, id));
            if (response[0].affectedRows !== 0) {
                await this.userActivityDao.addUserActivity(context.activityDone, context.userId, { ...input, id: id.toString() });
                return `user of id  ${input.id} updated successfully`;
            }
            throw new Error(`user of id ${id} not updated`);
        }
        catch (error) {
            throw new Error(`database error -> ${error}`);
        }
    }
};
exports.UserDao = UserDao;
exports.UserDao = UserDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.UserActivityDao])
], UserDao);
