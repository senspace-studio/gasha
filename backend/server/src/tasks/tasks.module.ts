import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/entities/event.entity';
import { AccountEntity } from 'src/entities/account.entity';
import { TotalEntity } from 'src/entities/total.entity';
import { LogicEntity } from 'src/entities/logic.entity';
import { ViemModule } from 'src/modules/viem/viem.module';
import { PointsModule } from 'src/modules/points/points.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      AccountEntity,
      TotalEntity,
      LogicEntity,
    ]),
    ViemModule,
    PointsModule,
  ],
  providers: [TasksService],
})
export class TasksModule {}
