import { Injectable } from '@nestjs/common';
import { LessThanOrEqual, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/entities/event.entity';
import { AccountEntity } from 'src/entities/account.entity';
import { TotalEntity } from 'src/entities/total.entity';
import { LogicEntity } from 'src/entities/logic.entity';
import { BonusAddress } from 'src/constants/BonusAddress';
import { PointCalcResponse } from 'src/types/point';

// DB
// '0','1711116000','1711177200','200','400','800'
// '1','1711177200','1711375200','200','400','800'
// '2','1711375200','1711396800','400','800','1600'
// '3','1711396800','1711436400','400','800','1600'
// '4','1711436400','1711544400','200','400','800'
// '5','1711544400','1711609200','400','800','1600'

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(TotalEntity)
    private readonly totalRepository: Repository<TotalEntity>,
    @InjectRepository(LogicEntity)
    private readonly logicRepository: Repository<LogicEntity>,
  ) {
    // const eventDates = [
    //   1711116000, // [0] Fri Mar 22 2024 23:00:00 GMT+0900 (Japan Standard Time) 開始時間
    //   1711177200, // [1] Sat Mar 23 2024 16:00:00 GMT+0900 (Japan Standard Time)
    //   1711375200, // [2] Mon Mar 25 2024 23:00:00 GMT+0900 (Japan Standard Time)
    //   1711396800, // [3] Tue Mar 26 2024 05:00:00 GMT+0900 (Japan Standard Time)
    //   1711436400, // [4] Tue Mar 26 2024 16:00:00 GMT+0900 (Japan Standard Time)
    //   1711544400, // [5] Thu Mar 27 2024 22:00:00 GMT+0900 (Japan Standard Time)
    //   1711609200, // [6] Fri Mar 28 2024 16:00:00 GMT+0900 (Japan Standard Time) 終了時間
    // ];
    // for (let i = 0; i < eventDates.length - 1; i++) {
    //   this.logicRepository.save({
    //     id: i,
    //     start: eventDates[0],
    //     end: eventDates[1],
    //     common: 200,
    //     rare: 400,
    //     special: 800,
    //   });
    // }
  }

  async getEventsByMinter(minter: string) {
    const events = await this.eventRepository.find({ where: { minter } });
    return events;
  }

  async getEvents(orderBy: 'DESC' | 'ASC', page: number, pageSize: number) {
    const [events, total] = await this.accountRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { points: orderBy },
    });
    return {
      data: events,
      total,
      page,
      pageSize,
    };
  }

  async saveEvent(event: Partial<EventEntity>) {
    await this.eventRepository.save(event);
  }

  async eventExists(
    minter: string,
    blockHash: string,
    transactionHash: string,
  ) {
    return await this.eventRepository.exists({
      where: {
        minter,
        blockHash,
        transactionHash,
      },
    });
  }

  async accountExists(address: string) {
    return await this.accountRepository.exists({ where: { address } });
  }

  async getAccount(address: string) {
    return await this.accountRepository.findOne({ where: { address } });
  }

  async updateAccount(address: string, points: number) {
    await this.accountRepository.save({ address, points });
  }

  async getTotal() {
    const exists = await this.totalRepository.exists({ where: { id: 0 } });
    if (!exists) {
      await this.totalRepository.save({
        id: 0,
        points: '0',
        events: '0',
        latestBlockNumber: '0',
        isRunning: false,
      });
    }
    return await this.totalRepository.findOne({ where: { id: 0 } });
  }

  async switchTotalRunning(isRunning: boolean) {
    await this.totalRepository.update({ id: 0 }, { isRunning });
  }

  async updateTotal(id: number, TotalEntity: Partial<TotalEntity>) {
    await this.totalRepository.update(id, TotalEntity);
  }

  async getLogics() {
    return await this.logicRepository.find();
  }

  async getLogicByDate(date: number) {
    return await this.logicRepository.findOne({
      where: {
        start: LessThanOrEqual(date),
        end: MoreThan(date),
      },
    });
  }

  // dateはミリ秒なので注意
  async calc(
    address: string,
    common: bigint,
    rare: bigint,
    special: bigint,
    date: bigint,
  ): Promise<PointCalcResponse> {
    const logic = await this.getLogicByDate(Number(date) / 1e3);
    console.log(Number(date) / 1e3, logic);
    if (!logic) {
      return {
        common: { amount: common, points: 0n },
        rare: { amount: rare, points: 0n },
        special: { amount: special, points: 0n },
      };
    }
    const bonus = logic.bonus && BonusAddress.includes(address.toLowerCase());
    return {
      common: {
        amount: common,
        points: common * BigInt(logic.common * (bonus ? 2 : 1)),
      },
      rare: {
        amount: rare,
        points: rare * BigInt(logic.rare * (bonus ? 2 : 1)),
      },
      special: {
        amount: special,
        points: special * BigInt(logic.special * (bonus ? 2 : 1)),
      },
    };
  }

  async getAccountEvents(address: string) {
    return await this.eventRepository.find({ where: { minter: address } });
  }
}
