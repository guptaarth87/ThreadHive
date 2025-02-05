import { Module } from '@nestjs/common';
import { RepliesService } from './reply.service';
import { RepliesResolver } from './reply.resolver';
import { ReplyDao } from './reply.dao';
import { AuthGuard } from '../gaurds/authGaurd.gaurds';


// import { BigIntScalar } from 'database-service/dist'; // Import BigIntScalar if using it here

@Module({
  providers: [RepliesService, RepliesResolver, ReplyDao, AuthGuard], // Register BigIntScalar here if needed
  exports: [RepliesService],
})
export class RepliesModule {}
