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
const graphql_1 = require("@nestjs/graphql");
const updateChannelInput_dto_1 = require("./dtos/updateChannelInput.dto");
const deleteChannelInput_dto_1 = require("./dtos/deleteChannelInput.dto");
const createChannelInput_dto_1 = require("./dtos/createChannelInput.dto");
const channelResponse_dto_1 = require("./dtos/channelResponse.dto");
const channel_service_1 = require("./channel.service");
let ChannelsResolver = class ChannelsResolver {
    constructor(channelsService) {
        this.channelsService = channelsService;
    }
    async getChannels() {
        return this.channelsService.getChannel();
    }
    async createChannel(input) {
        return this.channelsService.createChannel(input);
    }
    async deleteChannel(input) {
        return this.channelsService.deleteChannel(input); // You can access `input.id` directly
    }
    async updateChannel(input) {
        return this.channelsService.updateChannel(input); // You can access `input.id` directly
    }
};
exports.ChannelsResolver = ChannelsResolver;
__decorate([
    (0, graphql_1.Query)(() => [channelResponse_dto_1.ChannelResponseDto]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "getChannels", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createChannelInput_dto_1.CreateChannelInput]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "createChannel", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteChannelInput_dto_1.DeleteChannelInput]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "deleteChannel", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateChannelInput_dto_1.UpdateChannelInput]),
    __metadata("design:returntype", Promise)
], ChannelsResolver.prototype, "updateChannel", null);
exports.ChannelsResolver = ChannelsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [channel_service_1.ChannelsService])
], ChannelsResolver);
