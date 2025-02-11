"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChannelMappingModule = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const dist_1 = require("database-service-arth/dist");
const userChannel_dao_1 = require("./userChannel.dao");
const userchannel_resolver_1 = require("./userchannel.resolver");
const userChannel_service_1 = require("./userChannel.service");
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here
let UserChannelMappingModule = class UserChannelMappingModule {
};
exports.UserChannelMappingModule = UserChannelMappingModule;
exports.UserChannelMappingModule = UserChannelMappingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWTSECRET,
                signOptions: { expiresIn: '24h' },
            }),
        ],
        providers: [
            userChannel_service_1.UserChannelService,
            userchannel_resolver_1.UserChannelResolver,
            userChannel_dao_1.UserChannelDao,
            dist_1.UserActivityDao,
        ], // Register BigIntScalar here if needed
        exports: [userChannel_service_1.UserChannelService],
    })
], UserChannelMappingModule);
