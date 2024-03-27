import { Module } from '@nestjs/common';
import { OgpService } from './ogp.service';
import { ViemModule } from '../viem/viem.module';
import { OgpController } from './ogp.controller';

@Module({
  imports: [ViemModule],
  controllers: [OgpController],
  providers: [OgpService],
})
export class OgpModule {}
