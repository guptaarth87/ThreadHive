import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    origin: ['https://studio.apollographql.com', 'http://localhost:3000', 'http://localhost:5000'], // Add allowed origins
    credentials: true, // Allow cookies if using authentication
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.listen(4000, '0.0.0.0');
  console.log(`Posts service is running on: ${await app.getUrl()}`);
}

bootstrap();   