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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const authGaurd_gaurds_1 = require("../gaurds/authGaurd.gaurds");
const authGuardContext_dto_1 = require("../gaurds/authGuardContext.dto");
const likeEventInput_dto_1 = require("./dtos/likeEventInput.dto");
const likeResponse_dto_1 = require("./dtos/likeResponse.dto");
const like_service_1 = require("./like.service");
let LikesResolver = class LikesResolver {
    constructor(likesService) {
        this.likesService = likesService;
    }
    async getLikes() {
        return this.likesService.getLikes();
    }
    async toggleLike(input, context) {
        if (context.channelsAllowed.includes(input.channelId) ||
            context.role === 'SUPERADMIN') {
            return this.likesService.toggleLike(input, context);
        }
        throw new common_1.UnauthorizedException(`You are not allowed to make changes in this channel of id -> ${input.channelId}`);
    }
};
exports.LikesResolver = LikesResolver;
__decorate([
    (0, graphql_1.Query)(() => {
        return [likeResponse_dto_1.LikeResponseDto];
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LikesResolver.prototype, "getLikes", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [likeEventInput_dto_1.LikeEventInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], LikesResolver.prototype, "toggleLike", null);
exports.LikesResolver = LikesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [like_service_1.LikesService])
], LikesResolver);
