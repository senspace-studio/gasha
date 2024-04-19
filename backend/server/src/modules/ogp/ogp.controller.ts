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
import { ViemService } from '../viem/viem.service';
import { SpinResult } from 'src/types/point';

@Controller('ogp')
export class OgpController {
  private readonly logger = new Logger(OgpController.name);

  constructor(
    private readonly ogpService: OgpService,
    private readonly pointsService: PointsService,
    private readonly viemService: ViemService,
  ) {}

  @Get('/square.png')
  async getAddressSquareOgp(
    @Query('score') score: string,
    @Res() res: Response,
  ) {
    this.logger.log(this.getAddressSquareOgp.name);

    const mintResult: SpinResult = JSON.parse(score);
    const { result, totalPoint } = this.pointsService.calcHat(
      mintResult.ids,
      mintResult.quantities,
    );

    const file = await this.ogpService.generateSquareOgp(
      totalPoint,
      mintResult.minter,
      result,
    );
    res.set({ 'Content-Type': 'image/png' });
    res.send(file);
  }

  @Get('/result/square.png')
  async getResultSquareOgp(@Query() result: any, @Res() res: Response) {
    this.logger.log(this.getResultSquareOgp.name);

    const file = await this.ogpService.generateSquareOgp(
      4000,
      result.address,
      [],
    );
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
