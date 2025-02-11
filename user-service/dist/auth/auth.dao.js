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
exports.AuthDao = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const dist_1 = require("database-service-arth/dist");
const drizzle_orm_1 = require("drizzle-orm");
let AuthDao = class AuthDao {
    constructor(jwtService, userActivityDao) {
        this.jwtService = jwtService;
        this.userActivityDao = userActivityDao;
    }
    async validateUser(email, password) {
        const user = await dist_1.db
            .select()
            .from(dist_1.users)
            .where((0, drizzle_orm_1.eq)(dist_1.users.email, email))
            .limit(1);
        if (user && (await bcrypt.compare(password, user[0].password))) {
            const { ...result } = user[0];
            return result;
        }
        return undefined;
    }
    async login(user) {
        const payload = {
            email: user.email,
            role: user.role,
            sub: user.id.toString(),
        };
        return {
            accessToken: this.jwtService.sign(payload),
            payload,
        };
    }
    async logUserIn(email, password, context) {
        try {
            const user = await this.validateUser(email, password);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const response = await this.login(user);
            console.log(response);
            console.log(context);
            await this.userActivityDao.addUserActivity(context.activityDone, user.id, response);
            return response;
        }
        catch (error) {
            console.log('error->', error);
            throw new Error('Loginn failed !');
        }
    }
};
exports.AuthDao = AuthDao;
exports.AuthDao = AuthDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        dist_1.UserActivityDao])
], AuthDao);
