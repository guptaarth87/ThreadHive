"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepliesModule = void 0;
const common_1 = require("@nestjs/common");
const reply_service_1 = require("./reply.service");
const reply_resolver_1 = require("./reply.resolver");
const reply_dao_1 = require("./reply.dao");
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here
let RepliesModule = class RepliesModule {
};
exports.RepliesModule = RepliesModule;
exports.RepliesModule = RepliesModule = __decorate([
    (0, common_1.Module)({
        providers: [reply_service_1.RepliesService, reply_resolver_1.RepliesResolver, reply_dao_1.ReplyDao], // Register BigIntScalar here if needed
        exports: [reply_service_1.RepliesService],
    })
], RepliesModule);
