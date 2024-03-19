import { Controller, Get, Param, Query, Logger } from '@nestjs/common';
import { PointsService } from './points.service';
import { NeynarService } from 'src/modules/neynar/neynar.service';
import { ZoraService } from 'src/modules/zora/zora.service';
import { SpinEvent, ViemService } from 'src/modules/viem/viem.service';
import { Address } from 'viem';
// import { AccountEntity } from 'src/entities/account.entity';

@Controller('points')
export class PointsController {
  private readonly logger = new Logger(PointsController.name);
  constructor(
    private readonly pointsService: PointsService,
    private readonly neynarService: NeynarService,
    private readonly zoraService: ZoraService,
    private readonly viemService: ViemService,
  ) {}

  // クエリパラメータでページ、ソートの指定ができるように
  // /points?orderBy=DESC&page=2 1ページあたりとりあえず20個
  @Get('/')
  async getAllPoints(
    @Query('orderBy') orderBy?: 'DESC' | 'ASC',
    @Query('page') page?: string,
  ) {
    this.logger.log(
      this.getAllPoints.name,
      JSON.stringify({
        orderBy,
        page,
      }),
    );
    return await this.pointsService.getEvents(
      orderBy || 'DESC',
      Number(page || 1),
      20,
    );
  }

  // 全アドレスの合計ポイントを返却
  @Get('/total')
  async getTotalPoint() {
    this.logger.log(this.getTotalPoint.name);
    return this.pointsService.getTotal();
  }

  @Get('/update')
  async updatePointData() {
    this.logger.log(this.getTotalPoint.name);
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
    return serializedAccounts;
  }

  @Get('/:address')
  async getPointByAddress(@Param('address') address: string) {
    this.logger.log(this.getPointByAddress.name, JSON.stringify({ address }));
    return await this.pointsService.getAccount(address);
  }

  // クエリパラメータで引いたアイテムのレア度を指定
  // 特定のレア度のアイテムが出ずにパラメータに存在しない場合もあるのでundefinedに注意
  // 累計ではなく、単発の結果を返す。
  @Get('/:address/result')
  async getResultPointByAddress(
    @Param('address') address: string,
    @Query('common') common?: string,
    @Query('rare') rare?: string,
    @Query('special') special?: string,
  ) {
    this.logger.log(
      this.getResultPointByAddress.name,
      JSON.stringify({
        address,
        common,
        rare,
        special,
      }),
    );
    address = address.toLowerCase();
    const points = await this.pointsService.calc(
      address,
      BigInt(common || 0),
      BigInt(rare || 0),
      BigInt(special || 0),
      BigInt(new Date().getTime()),
    );
    return {
      address,
      common: {
        amount: `${points.common.amount}`,
        points: `${points.common.points}`,
      },
      rare: {
        amount: `${points.rare.amount}`,
        points: `${points.rare.points}`,
      },
      special: {
        amount: `${points.special.amount}`,
        points: `${points.special.points}`,
      },
    };
  }
}
