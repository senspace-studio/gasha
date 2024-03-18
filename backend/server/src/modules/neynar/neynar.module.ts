import { Module } from '@nestjs/common';
import { NeynarService } from './neynar.service';

@Module({
  providers: [NeynarService],
  exports: [NeynarService],
})
export class NeynarModule {}
