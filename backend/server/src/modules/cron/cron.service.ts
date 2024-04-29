import { Injectable, Logger } from '@nestjs/common';
import { PointsService } from '../points/points.service';
import { ViemService } from '../viem/viem.service';
import { SpinEvent } from 'src/types/contract';
import { Address } from 'viem';
import { Interval } from '@nestjs/schedule';
import { RUN_CRON, UPDATE_SCORE_INTERVAL_MINUTES } from 'src/utils/env';
import { AllowlistService } from '../allowlist/allowlist.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(
    private readonly pointsService: PointsService,
    private readonly allowlistService: AllowlistService,
    private readonly viemService: ViemService,
  ) {}

  @Interval(UPDATE_SCORE_INTERVAL_MINUTES * 60 * 1e3)
  async updateScore() {
    if (!RUN_CRON) {
      this.logger.log('this process does not cron worker');
      return;
    }

    const total = await this.pointsService.getTotal({
      includeOfficialNFTs: false,
    });

    if (total.isRunning) {
      this.logger.log('already running');
      return;
    }

    await this.pointsService.switchTotalRunning(true);

    const seriesItems = await this.viemService.getSeriesItems();
    let startBlockNumber = BigInt(total.latestBlockNumber) + 1n;
    const currentBlockNumber = await this.viemService.getLatestBlockNumber();
    const events = await this.viemService.getSpinEvents(0n, 0n);
    while (startBlockNumber < currentBlockNumber) {
      // 100ブロックずつ取得
      const unit = 100n;
      this.logger.log(`${startBlockNumber} < ${currentBlockNumber}`);
      const endBlockNumber = startBlockNumber + unit;
      events.push(
        ...(await this.viemService.getSpinEvents(
          startBlockNumber,
          currentBlockNumber < endBlockNumber
            ? currentBlockNumber
            : startBlockNumber + unit,
        )),
      );
      startBlockNumber += unit;

      await new Promise((resolve) => setTimeout(resolve, 200));
    }

    const accounts: { [address: string]: bigint } = {};
    let totalPoints = 0n;
    let totalNfts = 0n;

    for (const event of events) {
      const args = event['args'] as SpinEvent;
      const blockHash = event.blockHash.toLowerCase();
      const transactionHash = event.transactionHash.toLowerCase();
      const minter = args.minter.toLowerCase();
      if (typeof accounts[minter] === 'undefined') {
        accounts[minter] = 0n;
      }
      let common = 0n;
      let rare = 0n;
      let special = 0n;
      for (let i = 0; i < args.ids.length; i++) {
        const tokenId = args.ids[i];
        const quantitie = args.quantities[i];
        const item = seriesItems.find((e) => e.tokenId === tokenId);
        switch (item.rareness) {
          case 0:
            common += quantitie;
            break;
          case 1:
            rare += quantitie;
            break;
          case 2:
            special += quantitie;
            break;
          default:
            break;
        }
      }
      const timestamp = await this.viemService.getBlockTimestampByBlockHash(
        blockHash as Address,
      );
      const point = await this.pointsService.calc(
        minter,
        common,
        rare,
        special,
        Number(timestamp),
      );
      accounts[minter] += point.common.points;
      accounts[minter] += point.rare.points;
      accounts[minter] += point.special.points;
      totalPoints += point.common.points;
      totalPoints += point.rare.points;
      totalPoints += point.special.points;
      totalNfts = totalNfts + common + rare + special;
      startBlockNumber = event.blockNumber;

      // イベント情報を保存
      const isEventExist = await this.pointsService.eventExists(
        minter,
        blockHash,
        transactionHash,
      );
      if (!isEventExist) {
        await this.pointsService.saveEvent({
          transactionHash,
          blockHash,
          minter,
          common: common.toString(),
          rare: rare.toString(),
          special: special.toString(),
          timestamp: timestamp.toString(),
        });
      }

      // アカウントごとのポイント情報アップデート
      await this.pointsService.updateAccount(
        minter,
        // accounts[minter].points.toString(),
        Number(accounts[minter]),
      );
      // 集計アップデート
      await this.pointsService.updateTotal(0, {
        points: totalPoints.toString(),
        nfts: totalNfts.toString(),
      });
    }
    await this.pointsService.updateTotal(0, {
      isRunning: false,
    });
  }

  @Interval(1 * 60 * 1e3)
  async mintAllowlist() {
    if (!RUN_CRON) {
      this.logger.log('this process does not cron worker');
      return;
    }

    const isPending = await this.allowlistService.isPending();
    if (isPending) {
      this.logger.log('Pending drop');
      return;
    }

    const claimedList = await this.allowlistService.findClaimedList();
    await this.allowlistService.updateBatchStatus(
      claimedList.map((e) => e.id),
      'pending',
    );

    for (const record of claimedList) {
      try {
        await this.viemService.dropByAdmin(
          record.address as Address,
          record.tokenId,
        );
        await this.allowlistService.updateBatchStatus([record.id], 'minted');
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      } catch (error) {
        this.logger.error(error);
        await this.allowlistService.updateBatchStatus([record.id], 'failed');
      }
    }
  }
}
