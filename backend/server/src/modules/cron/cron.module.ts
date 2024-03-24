import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ViemService } from '../viem/viem.service';
import { PointsService } from '../points/points.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/entities/account.entity';
import { EventEntity } from 'src/entities/event.entity';
import { LogicEntity } from 'src/entities/logic.entity';
import { TotalEntity } from 'src/entities/total.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      AccountEntity,
      TotalEntity,
      LogicEntity,
    ]),
  ],
  providers: [ViemService, PointsService, CronService],
})
export class CronModule {}
