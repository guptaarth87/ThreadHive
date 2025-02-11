import {  Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'localhost',  // Change if using Docker
            port: 6379,
          },
          ttl: 60 * 5, // Cache TTL: 5 minutes
        }),
      }),
    }),
  ],
  exports: [CacheModule],
})
export class CacheConfigModule {}
