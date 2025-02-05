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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_service_1 = require("./user.service");
const response_dto_1 = require("./dtos/response.dto");
const createInput_dto_1 = require("./dtos/createInput.dto");
const deleteInput_dto_1 = require("./dtos/deleteInput.dto");
const updateInput_dto_1 = require("./dtos/updateInput.dto");
const statsResponse_dto_1 = require("./dtos/statsResponse.dto");
const statsInput_dto_1 = require("./dtos/statsInput.dto");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUsers() {
        return this.usersService.getUsers();
    }
    async getUserByEmail(email) {
        return this.usersService.findUserByEmail(email);
    }
    async getUserStats(input) {
        return this.usersService.getUserStats(input);
    }
    async createUser(input) {
        return this.usersService.createUser(input);
    }
    async deleteUser(input) {
        return this.usersService.deleteUser(input); // You can access `input.id` directly
    }
    async updateUser(input) {
        return this.usersService.updateUser(input); // You can access `input.id` directly
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, graphql_1.Query)(() => [response_dto_1.UserResponseDto]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUsers", null);
__decorate([
    (0, graphql_1.Query)(() => [response_dto_1.UserResponseDto]),
    __param(0, (0, graphql_1.Args)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUserByEmail", null);
__decorate([
    (0, graphql_1.Query)(() => [statsResponse_dto_1.StatsResponseDto]),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [statsInput_dto_1.StatsUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "getUserStats", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createInput_dto_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deleteInput_dto_1.DeleteUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updateInput_dto_1.UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [user_service_1.UsersService])
], UsersResolver);
