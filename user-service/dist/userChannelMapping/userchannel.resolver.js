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
let UserChannelResolver = class UserChannelResolver {
    constructor(userChannelService) {
        this.userChannelService = userChannelService;
    }
    async getUserChannelMapping() {
        return this.userChannelService.getUserChannelMapping();
    }
    async createUserChannelMapping(input) {
        return this.userChannelService.createUserChannelMapping(input);
    }
    async deleteUserChannelMapping(input) {
        return this.userChannelService.deleteUserChannelMapping(input); // You can access `input.id` directly
    }
    async updateUserChannelMapping(input) {
        return this.userChannelService.updateUserChannelMapping(input); // You can access `input.id` directly
    }
};
exports.UserChannelResolver = UserChannelResolver;
__decorate([
    (0, graphql_1.Query)(() => {
        return [responseUserChannel_dto_1.UserChannelResponseDto];
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserChannelResolver.prototype, "getUserChannelMapping", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserChannelInput_dto_1.CreateUserChannelInput]),
    __metadata("design:returntype", Promise)
], UserChannelResolver.prototype, "createUserChannelMapping", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteUserChannelInput_dto_1.DeleteUserChannelInput]),
    __metadata("design:returntype", Promise)
], UserChannelResolver.prototype, "deleteUserChannelMapping", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateUserChannelInput_dto_1.UpdateUserChannelInput]),
    __metadata("design:returntype", Promise)
], UserChannelResolver.prototype, "updateUserChannelMapping", null);
exports.UserChannelResolver = UserChannelResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [userChannel_service_1.UserChannelService])
], UserChannelResolver);
