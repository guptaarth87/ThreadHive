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
exports.ChannelsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const channel_service_1 = require("./channel.service");
const authGaurd_gaurds_1 = require("../gaurds/authGaurd.gaurds");
const authGuardContext_dto_1 = require("../gaurds/authGuardContext.dto");
const channelResponse_dto_1 = require("./dtos/channelResponse.dto");
const createChannelInput_dto_1 = require("./dtos/createChannelInput.dto");
const deleteChannelInput_dto_1 = require("./dtos/deleteChannelInput.dto");
const updateChannelInput_dto_1 = require("./dtos/updateChannelInput.dto");
let ChannelsResolver = class ChannelsResolver {
    constructor(channelsService) {
        this.channelsService = channelsService;
    }
    async getChannels(context) {
        return this.channelsService.getChannel(context);
    }
    async createChannel(input, context) {
        if (context.role === 'SUPERADMIN') {
            return this.channelsService.createChannel(input, context);
        }
        throw new common_1.UnauthorizedException('you are not allowed you are not a super admin');
    }
    async deleteChannel(input, context) {
        if (context.role === 'SUPERADMIN') {
            return this.channelsService.deleteChannel(input, context); // You can access `input.id` directly
        }
        throw new common_1.UnauthorizedException('you are not allowed you are not a super admin');
    }
    async updateChannel(input, context) {
        if (context.role === 'SUPERADMIN') {
            return this.channelsService.updateChannel(input, context); // You can access `input.id` directly
        }
        throw new common_1.UnauthorizedException('you are not allowed you are not a super admin');
    }
};
exports.ChannelsResolver = ChannelsResolver;
__decorate([
    (0, graphql_1.Query)(() => {
        return [channelResponse_dto_1.ChannelResponseDto];
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "getChannels", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createChannelInput_dto_1.CreateChannelInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "createChannel", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteChannelInput_dto_1.DeleteChannelInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "deleteChannel", null);
__decorate([
    (0, graphql_1.Mutation)(() => {
        return String;
    }),
    (0, common_1.UseGuards)(authGaurd_gaurds_1.AuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateChannelInput_dto_1.UpdateChannelInput,
        authGuardContext_dto_1.AuthGaurdContextDto]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "updateChannel", null);
exports.ChannelsResolver = ChannelsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [channel_service_1.ChannelsService])
], ChannelsResolver);
