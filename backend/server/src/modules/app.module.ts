import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NeynarModule } from './neynar/neynar.module';
import { ZoraModule } from './zora/zora.module';
import { PointsModule } from './points/points.module';
import { ViemModule } from './viem/viem.module';
import {
  DB_DOMAIN,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from 'src/utils/env';
import { AccountEntity } from 'src/entities/account.entity';
import { EventEntity } from 'src/entities/event.entity';
import { TotalEntity } from 'src/entities/total.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_DOMAIN,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: [AccountEntity, EventEntity, TotalEntity],
      synchronize: true,
    }),
    NeynarModule,
    ZoraModule,
    ViemModule,
    PointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}