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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeEventInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const dist_1 = require("database-service-arth/dist");
let LikeEventInput = class LikeEventInput {
};
exports.LikeEventInput = LikeEventInput;
__decorate([
    (0, graphql_1.Field)(() => dist_1.LIKETYPE),
    __metadata("design:type", String)
], LikeEventInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], LikeEventInput.prototype, "typeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], LikeEventInput.prototype, "likedBy", void 0);
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], LikeEventInput.prototype, "channelId", void 0);
__decorate([
    (0, graphql_1.Field)(() => dist_1.BigIntScalar),
    __metadata("design:type", BigInt)
], LikeEventInput.prototype, "postId", void 0);
exports.LikeEventInput = LikeEventInput = __decorate([
    (0, graphql_1.InputType)()
], LikeEventInput);
