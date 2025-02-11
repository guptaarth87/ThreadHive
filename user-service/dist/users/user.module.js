"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dist_1 = require("database-service-arth/dist");
const authGaurd_gaurds_1 = require("../gaurds/authGaurd.gaurds");
const user_dao_1 = require("./user.dao");
const user_resolver_1 = require("./user.resolver");
const user_service_1 = require("./user.service");
const userStats_dao_1 = require("./userStats.dao");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWTSECRET,
                signOptions: { expiresIn: '24h' },
            }),
        ],
        providers: [
            user_service_1.UsersService,
            user_resolver_1.UsersResolver,
            user_dao_1.UserDao,
            userStats_dao_1.userStatsDao,
            dist_1.UserActivityDao,
            authGaurd_gaurds_1.AuthGuard, // Apply the guard to only users
        ], // Register BigIntScalar here if needed
        exports: [user_service_1.UsersService],
    })
], UsersModule);
