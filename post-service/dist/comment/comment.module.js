"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dist_1 = require("database-service-arth/dist");
const authGaurd_gaurds_1 = require("../gaurds/authGaurd.gaurds");
const comment_dao_1 = require("./comment.dao");
const comment_resolver_1 = require("./comment.resolver");
const comment_service_1 = require("./comment.service");
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWTSECRET,
                signOptions: { expiresIn: '24h' },
            }),
        ],
        providers: [
            comment_service_1.CommentsService,
            comment_resolver_1.CommentsResolver,
            comment_dao_1.CommentDao,
            authGaurd_gaurds_1.AuthGuard,
            dist_1.UserActivityDao,
        ], // Register BigIntScalar here if needed
        exports: [comment_service_1.CommentsService],
    })
], CommentsModule);
