import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/entities/event.entity';
import { AccountEntity } from 'src/entities/account.entity';
import { TotalEntity } from 'src/entities/total.entity';

export type PointCalcResponse = {
  special: {
    amount: bigint;
    points: bigint;
  };
  rare: {
    amount: bigint;
    points: bigint;
  };
  common: {
    amount: bigint;
    points: bigint;
  };
};

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(TotalEntity)
    private readonly totalRepository: Repository<TotalEntity>,
  ) {}

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
      await this.updateTotal('0', '0', '0', '0');
    }
    return await this.totalRepository.findOne({ where: { id: 0 } });
  }

  async updateTotal(
    points: string,
    events: string,
    nfts: string,
    latestBlockNumber: string,
  ) {
    await this.totalRepository.save({
      id: 0,
      points,
      events,
      nfts,
      latestBlockNumber,
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
    const res: PointCalcResponse = {
      common: { amount: common, points: 0n },
      rare: { amount: rare, points: 0n },
      special: { amount: special, points: 0n },
    };
    // ベースポイントの設定
    const basepoint = {
      common: 200n,
      rare: 400n,
      special: 800n,
    };
    // 日付の分割に使う
    const eventDates = [
      1711116000000, // [0] Fri Mar 22 2024 23:00:00 GMT+0900 (Japan Standard Time) 開始時間
      1711177200000, // [1] Sat Mar 23 2024 16:00:00 GMT+0900 (Japan Standard Time)
      1711375200000, // [2] Mon Mar 25 2024 23:00:00 GMT+0900 (Japan Standard Time)
      1711396800000, // [3] Tue Mar 26 2024 05:00:00 GMT+0900 (Japan Standard Time)
      1711436400000, // [4] Tue Mar 26 2024 16:00:00 GMT+0900 (Japan Standard Time)
      1711544400000, // [5] Thu Mar 27 2024 22:00:00 GMT+0900 (Japan Standard Time)
      1711609200000, // [6] Fri Mar 28 2024 16:00:00 GMT+0900 (Japan Standard Time) 終了時間
    ];

    const calcDay = (timestamp: number) => {
      if (eventDates[eventDates.length - 1] <= timestamp) {
        // 範囲外（終了時刻以降）
        return -1;
      }
      // 日付範囲を返す
      for (let i = eventDates.length - 2; 0 <= i; i--) {
        if (eventDates[i] <= timestamp) {
          return i;
        }
      }
      // 範囲外（開始時間前）
      return -1;
    };

    // ダブルポイントか否か
    let isDouble = false;
    const day = calcDay(Number(date));
    switch (day) {
      case 0:
        // 1日目
        // [TODO] チャンネル登録していたらボーナスの処理を加える
        // isDouble = true;
        break;
      case 1:
        // 2日目 通常
        break;
      case 2:
        // 3日目 ダブルポイント
        isDouble = true;
        break;
      case 3:
        // 4日目 1日目だけリストックでダブルポイント
        const events = await this.getEventsByMinter(address);
        for (const event of events) {
          if (calcDay(Number(event.timestamp)) === 0) {
            isDouble = true;
          }
        }
        break;
      case 4:
        // 5日目 通常
        break;
      case 5:
        // 6日目 ダブルポイント
        isDouble = true;
      default:
        // [DEBUG] 本番ではコメントアウトを外す
        // 異常な日付はポイントを計算せずに返す
        // return 0n;
        break;
    }
    res.common.points = common * basepoint.common * (isDouble ? 2n : 1n);
    res.rare.points = rare * basepoint.rare * (isDouble ? 2n : 1n);
    res.special.points = special * basepoint.special * (isDouble ? 2n : 1n);
    return res;
  }
}
