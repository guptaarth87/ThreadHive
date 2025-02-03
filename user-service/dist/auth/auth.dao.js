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
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../users/user.service");
const drizzle_orm_1 = require("drizzle-orm");
const dist_1 = require("database-service/dist"); // Ensure correct import
const dist_2 = require("database-service/dist");
const common_1 = require("@nestjs/common");
let AuthDao = class AuthDao {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await dist_2.db.select().from(dist_1.users).where((0, drizzle_orm_1.eq)(dist_1.users.email, email)).limit(1);
        if (user && (await bcrypt.compare(password, user[0].password))) {
            const { password, ...result } = user[0];
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, role: user.role, sub: user.id.toString() };
        return {
            access_token: this.jwtService.sign(payload),
            payload: payload
        };
    }
    async logUserIn(email, password) {
        try {
            const user = await this.validateUser(email, password);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            const response = (await this.login(user));
            console.log(response);
            return response;
        }
        catch (error) {
            console.log("error->", error);
            throw new Error('Loginn failed !');
        }
    }
};
exports.AuthDao = AuthDao;
exports.AuthDao = AuthDao = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UsersService,
        jwt_1.JwtService])
], AuthDao);
