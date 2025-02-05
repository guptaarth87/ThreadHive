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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_dao_1 = require("./user.dao");
const userStats_dao_1 = require("./userStats.dao");
let UsersService = class UsersService {
    constructor(userDao, userStatsDao) {
        this.userDao = userDao;
        this.userStatsDao = userStatsDao;
    } // Inject `UserDao`
    async createUser(input) {
        return this.userDao.createUserDao(input);
    }
    async findUserByEmail(email) {
        return this.userDao.findUserByEmailDao(email);
    }
    async getUserStats(input) {
        return this.userStatsDao.getUserPostStats(input);
    }
    async getUsers() {
        return this.userDao.getUsersDao();
    }
    async deleteUser(input) {
        return this.userDao.deleteUserDao(input);
    }
    async updateUser(input) {
        return this.userDao.updateUser(input);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_dao_1.UserDao,
        userStats_dao_1.userStatsDao])
], UsersService);
