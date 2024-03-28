import { Injectable, Logger } from '@nestjs/common';
import { PointsService } from '../points/points.service';
import { ViemService } from '../viem/viem.service';
import { SpinEvent } from 'src/types/contract';
import { Address } from 'viem';
import { Interval } from '@nestjs/schedule';
import { RUN_CRON } from 'src/utils/env';
import { AllowlistService } from '../allowlist/allowlist.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(
    private readonly pointsService: PointsService,
    private readonly allowlistService: AllowlistService,
    private readonly viemService: ViemService,
  ) {}

  @Interval(5 * 60 * 1e3)
  async updateScore() {
    if (!RUN_CRON) {
      this.logger.log('this process does not cron worker');
      return;
    }
    const timestamps: { [hash: Address]: number } = {};
    const total = await this.pointsService.getTotal();
    const seriesItems = await this.viemService.getSeriesItems();
    let totalPoints = BigInt(total.points);
    let totalEvents = BigInt(total.events);
    let totalNfts = BigInt(total.nfts);
    let startBlockNumber = BigInt(total.latestBlockNumber) + 1n;
    const currentBlockNumber = await this.viemService.getLatestBlockNumber();
    const events = await this.viemService.getSpinEvents(0n, 0n);
    startBlockNumber++;
    while (startBlockNumber < currentBlockNumber) {
      // 500ブロックずつ取得
      const unit = 500n;
      this.logger.debug(`${startBlockNumber} < ${currentBlockNumber}`);
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
    }
    const accounts: { [address: string]: { points: bigint } } = {};
    for (const event of events) {
      this.logger.debug(event);
      const args = event['args'] as SpinEvent;
      const blockHash = event.blockHash.toLowerCase();
      const transactionHash = event.transactionHash.toLowerCase();
      const minter = args.minter.toLowerCase();
      if (!accounts[minter]) {
        // アカウント情報をDBから取得
        if (await this.pointsService.accountExists(minter)) {
          const account = await this.pointsService.getAccount(minter);
          accounts[minter] = { points: BigInt(account.points) };
        } else {
          // なければ初期化
          accounts[minter] = { points: 0n };
        }
      }
      if (
        !(await this.pointsService.eventExists(
          minter,
          blockHash,
          transactionHash,
        ))
      ) {
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
        if (!timestamps[blockHash]) {
          const timestamp = await this.viemService.getBlockTimestampByBlockHash(
            blockHash as Address,
          );
          timestamps[blockHash] = Number(timestamp) * 1e3;
        }
        if (!accounts[minter]) {
          accounts[minter] = { points: 0n };
        }
        const timestamp = timestamps[blockHash];
        const point = await this.pointsService.calc(
          minter,
          common,
          rare,
          special,
          timestamp,
        );
        accounts[minter].points += point.common.points;
        accounts[minter].points += point.rare.points;
        accounts[minter].points += point.special.points;
        totalPoints += point.common.points;
        totalPoints += point.rare.points;
        totalPoints += point.special.points;
        totalNfts = totalNfts + common + rare + special;
        totalEvents++;
        startBlockNumber = event.blockNumber;
        // イベント情報を保存
        await this.pointsService.saveEvent({
          transactionHash,
          blockHash,
          minter,
          common: common.toString(),
          rare: rare.toString(),
          special: special.toString(),
          timestamp,
        });
        // アカウントごとのポイント情報アップデート
        await this.pointsService.updateAccount(
          minter,
          // accounts[minter].points.toString(),
          Number(accounts[minter].points),
        );
        // 集計アップデート
        await this.pointsService.updateTotal(
          totalPoints.toString(),
          totalEvents.toString(),
          totalNfts.toString(),
          startBlockNumber.toString(),
        );
      }
    }
    // response
    const serializedAccounts: { address: string; points: string }[] = [];
    for (const address in accounts) {
      serializedAccounts.push({
        address,
        points: `${accounts[address].points}`,
      });
    }
  }

  @Interval(1 * 60 * 1e3)
  async mintAllowlist() {
    if (!RUN_CRON) {
      this.logger.log('this process does not cron worker');
      return;
    }
    this.logger.log('mintAllowlist');

    const claimedList = await this.allowlistService.findClaimedList();
    await this.allowlistService.updateBatchStatus(
      claimedList.map((e) => e.address),
      'pending',
    );

    for (const record of claimedList) {
      await this.viemService;
    }
  }
}
