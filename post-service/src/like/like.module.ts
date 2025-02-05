import { Module } from '@nestjs/common';
import { LikesService } from './like.service';
import { LikesResolver } from './like.resolver';
import { LikesDao } from './like.dao';



// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  providers: [LikesService, LikesResolver,  LikesDao], // Register BigIntScalar here if needed
  exports: [LikesService],
})
export class LikesModule {}
