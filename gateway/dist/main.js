"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.enableCors({
        origin: ['https://studio.apollographql.com', 'http://localhost:5000'], // Add allowed origins
        credentials: true, // Allow cookies if using authentication
        allowedHeaders: 'Content-Type, Authorization',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    });
    await app.listen(5000, '0.0.0.0');
    console.log(`Gateway is On-> running on: ${await app.getUrl()}`);
    // Set the application to listen on port 5000
}
bootstrap();
