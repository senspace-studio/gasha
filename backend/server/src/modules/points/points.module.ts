import { Module } from '@nestjs/common';
import { PointsController } from './points.controller';
import { PointsService } from './points.service';
import { ZoraModule } from 'src/modules/zora/zora.module';
import { NeynarModule } from 'src/modules/neynar/neynar.module';
import { ViemModule } from 'src/modules/viem/viem.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/entities/event.entity';
import { AccountEntity } from 'src/entities/account.entity';
import { TotalEntity } from 'src/entities/total.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, AccountEntity, TotalEntity]),
    NeynarModule,
    ZoraModule,
    ViemModule,
  ],
  controllers: [PointsController],
  providers: [PointsService],
})
export class PointsModule {}
