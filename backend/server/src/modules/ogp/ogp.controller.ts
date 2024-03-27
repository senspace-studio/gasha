import { Controller, Get, Logger, Res } from '@nestjs/common';
import { OgpService } from './ogp.service';
import { Response } from 'express';

@Controller('ogp')
export class OgpController {
  private readonly logger = new Logger(OgpController.name);

  constructor(private readonly ogpService: OgpService) {}

  @Get('/square')
  async getSquareOgp(@Res() res: Response) {
    this.logger.log(this.getSquareOgp.name);
    const file = await this.ogpService.generateSquareOgp();
    res.set({ 'Content-Type': 'image/png' });
    res.send(file);
  }
}
