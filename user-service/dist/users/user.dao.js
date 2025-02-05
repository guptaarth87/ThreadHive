"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDao = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dist_1 = require("database-service/dist"); // Ensure correct import
const dist_2 = require("database-service/dist");
const bcrypt = require("bcryptjs");
class UserDao {
    formatDateForMySQL(dateStr) {
        const [day, month, year] = dateStr.split('-');
        const date = new Date(`${year}-${month}-${day}`);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    }
    async createUserDao(input) {
        console.log("in create block");
        try {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            const dataObj = {
                name: input.name,
                email: input.email,
                password: hashedPassword,
                role: input.role,
                dob: input.dob,
                createdAt: new Date(),
                isDeleted: false,
            };
            const newUser = await dist_2.db.insert(dist_1.users).values(dataObj); // .returning() returns inserted row(s)
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
    async findUserByEmailDao(email) {
        try {
            const user = await dist_2.db.select().from(dist_1.users).where((0, drizzle_orm_1.eq)(dist_1.users.email, email)).limit(1);
            console.log(user);
            return user; // Return null if not found
        }
        catch (error) {
            console.log("error-->", error);
            throw new Error('Database error !');
        }
    }
    async getUsersDao() {
        try {
            const res = await dist_2.db.select().from(dist_1.users);
            return res;
        }
        catch (error) {
            console.log("error-->", error);
            throw new Error('Database error !');
        }
    }
    async deleteUserDao(input) {
        try {
            const { id } = input;
            const response = await dist_2.db.delete(dist_1.users).where((0, drizzle_orm_1.eq)(dist_1.users.id, id));
            console.log(response);
            if (response[0].affectedRows != 0) {
                return `user with if ${id} deleted successfully`;
            }
            else {
                throw new Error(`user id not found -> ${id}`);
            }
        }
        catch (error) {
            throw new Error(`error in db with mesage -> ${error}`);
        }
    }
    async updateUser(input) {
        try {
            const { id, name, email, password, role, dob } = input;
            const user = await dist_2.db.select().from(dist_1.users).where((0, drizzle_orm_1.eq)(dist_1.users.id, id)).limit(1);
            if (!user) {
                throw new Error(`User with id ${id} not found`);
            }
            const updated_data = {};
            // Update only the fields that were provided in the input
            if (name !== undefined)
                updated_data['name'] = name;
            if (email !== undefined)
                updated_data['email'] = email;
            if (password !== undefined)
                updated_data['password'] = await bcrypt.hash(password, 10); // If password is provided, hash it
            if (role !== undefined)
                updated_data['role'] = role;
            if (dob !== undefined)
                updated_data['dob'] = dob;
            updated_data['modifiedAt'] = new Date();
            // Save the updated user
            const response = await dist_2.db.update(dist_1.users).set(updated_data).where((0, drizzle_orm_1.eq)(dist_1.users.id, id));
            if (response[0].affectedRows != 0) {
                return `user of id  ${input.id} updated successfully`;
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
exports.UserDao = UserDao;
