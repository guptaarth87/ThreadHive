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
exports.UserChannelResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const createUserChannelInput_dto_1 = require("./dtos/createUserChannelInput.dto");
const deleteUserChannelInput_dto_1 = require("./dtos/deleteUserChannelInput.dto");
const responseUserChannel_dto_1 = require("./dtos/responseUserChannel.dto");
const updateUserChannelInput_dto_1 = require("./dtos/updateUserChannelInput.dto");
const userChannel_service_1 = require("./userChannel.service");
const common_1 = require("@nestjs/common");
const authGaurd_gaurds_1 = require("../gaurds/authGaurd.gaurds");
const authGuardContext_dto_1 = require("../gaurds/authGuardContext.dto");
let UserChannelResolver = class UserChannelResolver {
    constructor(userChannelService) {
        this.userChannelService = userChannelService;
    }
    async getUserChannelMapping(context) {
        return this.userChannelService.getUserChannelMapping(context);
    }
    async createUserChannelMapping(input, context) {
        return this.userChannelService.createUserChannelMapping(input, context);
    }
    async deleteUserChannelMapping(input, context) {
        return this.userChannelService.deleteUserChannelMapping(input, context); // You can access `input.id` directly
    }
    async updateUserChannelMapping(input, context) {
        return this.userChannelService.updateUserChannelMapping(input, context); // You can access `input.id` directly
    }
};
exports.UserChannelResolver = UserChannelResolver;
__decorate([
    (0, graphql_1.Query)(() => {
        return [responseUserChannel_dto_1.UserChannelResponseDto];
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], UserChannelResolver.prototype, "getUserChannelMapping", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserChannelInput_dto_1.CreateUserChannelInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], UserChannelResolver.prototype, "createUserChannelMapping", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteUserChannelInput_dto_1.DeleteUserChannelInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], UserChannelResolver.prototype, "deleteUserChannelMapping", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUserChannelInput_dto_1.UpdateUserChannelInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], UserChannelResolver.prototype, "updateUserChannelMapping", null);
exports.UserChannelResolver = UserChannelResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [userChannel_service_1.UserChannelService])
], UserChannelResolver);
