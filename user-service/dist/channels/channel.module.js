"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelsModule = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("./channel.service");
const channel_resolver_1 = require("./channel.resolver");
const channel_dao_1 = require("./channel.dao");
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here
let ChannelsModule = class ChannelsModule {
};
exports.ChannelsModule = ChannelsModule;
exports.ChannelsModule = ChannelsModule = __decorate([
    (0, common_1.Module)({
        providers: [channel_service_1.ChannelsService, channel_resolver_1.ChannelsResolver, channel_dao_1.ChannelDao], // Register BigIntScalar here if needed
        exports: [channel_service_1.ChannelsService],
    })
], ChannelsModule);
