import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { OgpService } from './ogp.service';
import { Response } from 'express';
import { PointsService } from '../points/points.service';
import { rarenessLabel } from 'src/constants/Gasha';
import { ADMIN_ADDRESSES } from 'src/constants/Admin';

@Controller('ogp')
export class OgpController {
  private readonly logger = new Logger(OgpController.name);

  constructor(
    private readonly ogpService: OgpService,
    private readonly pointsService: PointsService,
  ) {}

  @Get('/:address/square.png')
  async getAddressSquareOgp(
    @Param('address') address: string,
    @Res() res: Response,
  ) {
    this.logger.log(this.getAddressSquareOgp.name);

    const events = await this.pointsService.getEventsByMinter(address);

    const items = [
      {
        rareness: 'special',
        points: 0,
        tokens: [
          {
            tokenId: 3,
            quantity: 0,
          },
        ],
      },
      {
        rareness: 'rare',
        points: 0,
        tokens: [
          {
            tokenId: 2,
            quantity: 0,
          },
        ],
      },
      {
        rareness: 'common',
        points: 0,
        tokens: [
          {
            tokenId: 1,
            quantity: 0,
          },
        ],
      },
    ];

    for (const event of events) {
      const calclated = await this.pointsService.calc(
        address,
        BigInt(event.common),
        BigInt(event.rare),
        BigInt(event.special),
        BigInt(event.timestamp),
      );
      items.find((item) => item.rareness === 'common').points += Number(
        calclated.common.points,
      );
      items.find((item) => item.rareness === 'rare').points += Number(
        calclated.rare.points,
      );
      items.find((item) => item.rareness === 'special').points += Number(
        calclated.special.points,
      );
      items.find((item) => item.rareness === 'common').tokens[0].quantity +=
        Number(event.common);
      items.find((item) => item.rareness === 'rare').tokens[0].quantity +=
        Number(event.rare);
      items.find((item) => item.rareness === 'special').tokens[0].quantity +=
        Number(event.special);
    }

    const { points: totalPoints } =
      await this.pointsService.getAccount(address);

    const file = await this.ogpService.generateSquareOgp(
      totalPoints,
      address,
      items.filter((item) => item.points > 0) as any,
    );
    res.set({ 'Content-Type': 'image/png' });
    res.send(file);
  }

  @Get('/result/:id/square.png')
  async getResultSquareOgp(@Param('id') id: string, @Res() res: Response) {
    this.logger.log(this.getResultSquareOgp.name);

    const result = await this.ogpService.getResult(Number(id));
    const rareness = result.result.reduce(
      (acc, { rareness, quantity }) => {
        const label = rarenessLabel[rareness] as keyof typeof acc;
        acc[label] += quantity;
        return acc;
      },
      { common: 0, rare: 0, special: 0 },
    );

    const calclated = await this.pointsService.calc(
      result.address,
      BigInt(rareness.common),
      BigInt(rareness.rare),
      BigInt(rareness.special),
      BigInt(result.date * 1000),
    );
    const totalPoints =
      calclated.common.points +
      calclated.rare.points +
      calclated.special.points;

    const items = [
      { rareness: 'special', points: 0, tokens: [] },
      { rareness: 'rare', points: 0, tokens: [] },
      { rareness: 'common', points: 0, tokens: [] },
    ];

    for (let i = 0; i < result.result.length; i++) {
      const rareness = rarenessLabel[result.result[i].rareness] as
        | 'common'
        | 'rare'
        | 'special';
      items.find((item) => item.rareness === rareness).points += Number(
        calclated[rareness].points,
      );
      items
        .find((item) => item.rareness === rareness)
        .tokens.push({
          tokenId: result.result[i].tokenId,
          quantity: result.result[i].quantity,
        });
    }

    const file = await this.ogpService.generateSquareOgp(
      Number(totalPoints),
      result.address,
      items.filter((item) => item.points > 0) as any,
    );
    res.set({ 'Content-Type': 'image/png' });
    res.send(file);
  }

  @Get('/leaderboard.png')
  async getLeaderboardOgp(
    @Res() res: Response,
    @Query('address') address: string,
  ) {
    this.logger.log(this.getLeaderboardOgp.name);
    address = address?.toLocaleLowerCase() || null;

    const me = address ? await this.pointsService.getAccount(address) : null;
    const { data: leaderBoard } = await this.pointsService.getEvents(
      'DESC',
      1,
      me ? 3 : 4,
      ADMIN_ADDRESSES,
    );
    const total = await this.pointsService.getTotal({
      includeOfficialNFTs: true,
    });

    const file = await this.ogpService.generateLeaderboardOgp(
      me ? [me, ...leaderBoard] : leaderBoard,
      me,
      Number(total.points),
    );
    res.set({ 'Content-Type': 'image/png' });
    res.send(file);
  }

  @Get('/:address/square.png')
  async getRectangleOgp(@Res() res: Response) {
    this.logger.log(this.getRectangleOgp.name);
    const file = await this.ogpService.generateRectangleOgp();
    res.set({ 'Content-Type': 'image/png' });
    res.send(file);
  }

  @Post('/save-result')
  async saveResult(
    @Body('address') address: string,
    @Body('result') result: any[],
  ) {
    this.logger.log(this.saveResult.name);
    const res = await this.ogpService.saveResult(address, result);
    return res;
  }
}
