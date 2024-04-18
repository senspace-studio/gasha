import { Module } from '@nestjs/common';
import { WIHService } from './wih.service';
import { WIHController } from './wih.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WIHCountEntity } from 'src/entities/wih_count.entity';
import { SyndicateModule } from '../syndicate/syndicate.module';
import { NeynarModule } from '../neynar/neynar.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WIHCountEntity]),
    SyndicateModule,
    NeynarModule,
  ],
  providers: [WIHService],
  exports: [WIHService],
  controllers: [WIHController],
})
export class WIHModule {}
