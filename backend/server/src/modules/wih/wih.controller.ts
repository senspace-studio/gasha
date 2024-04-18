import { Controller, Post, Body, Logger, Param } from '@nestjs/common';
import { WIHService } from 'src/modules/wih/wih.service';
import { SyndicateService } from '../syndicate/syndicate.service';
import { NeynarService } from '../neynar/neynar.service';

@Controller('wih')
export class WIHController {
  private readonly logger = new Logger(WIHController.name);
  constructor(
    private readonly wihService: WIHService,
    private readonly syndicateService: SyndicateService,
    private readonly naynarService: NeynarService,
  ) {}

  @Post('choosehat/:options')
  async chooseHat(
    @Body('trustedData') trustedData: { messageBytes: string },
    @Param('options') options: string,
  ) {
    const res = await this.naynarService.validateRequest(
      trustedData.messageBytes,
    );
    const buttonIndex = res.action.button.index;
    const address = res.action.signer.client.verified_addresses.eth_addresses;
    console.log(trustedData, options);
  }
}
