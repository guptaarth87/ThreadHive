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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
// Import your Drizzle service
const jwt_1 = require("@nestjs/jwt"); // Assuming you're using JWT for authentication
const dist_1 = require("database-service/dist");
const dist_2 = require("database-service/dist");
const drizzle_orm_1 = require("drizzle-orm");
let AuthGuard = class AuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        // Check if the token is provided
        if (!token) {
            throw new common_1.UnauthorizedException('No token provided');
        }
        try {
            // Extract the JWT payload (email and roles)
            const decodedToken = this.jwtService.verify(token.split(' ')[1]);
            const email = decodedToken.email;
            const roles = decodedToken.roles;
            // Query the database to check if the email and roles exist in the users table
            const user = await dist_1.db.select().from(dist_2.users).where((0, drizzle_orm_1.eq)(dist_2.users.email, email));
            if (!user || user.roles !== roles) {
                throw new common_1.UnauthorizedException('Invalid email or roles');
            }
            // Attach user information to the request object (for use in other guards or controllers)
            request.user = user;
            return true; // Allow access if the user is found and roles match
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthGuard);
