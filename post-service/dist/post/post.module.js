"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_resolver_1 = require("./post.resolver");
const post_dao_1 = require("./post.dao");
// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = __decorate([
    (0, common_1.Module)({
        providers: [post_service_1.PostsService, post_resolver_1.PostsResolver, post_dao_1.PostDao], // Register BigIntScalar here if needed
        exports: [post_service_1.PostsService],
    })
], PostsModule);
