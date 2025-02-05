"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesModule = void 0;
const common_1 = require("@nestjs/common");
const like_service_1 = require("./like.service");
const like_resolver_1 = require("./like.resolver");
const like_dao_1 = require("./like.dao");
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here
let LikesModule = class LikesModule {
};
exports.LikesModule = LikesModule;
exports.LikesModule = LikesModule = __decorate([
    (0, common_1.Module)({
        providers: [like_service_1.LikesService, like_resolver_1.LikesResolver, like_dao_1.LikesDao], // Register BigIntScalar here if needed
        exports: [like_service_1.LikesService],
    })
], LikesModule);
