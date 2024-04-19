import {
  Controller,
  Post,
  Get,
  Body,
  Logger,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { WIHService } from 'src/modules/wih/wih.service';
import { SyndicateService } from '../syndicate/syndicate.service';
import { NeynarService } from '../neynar/neynar.service';
import { FORWARDER_ADDRESS } from 'src/utils/env';

@Controller('wih')
export class WIHController {
  private readonly logger = new Logger(WIHController.name);
  constructor(
    private readonly wihService: WIHService,
    private readonly syndicateService: SyndicateService,
    private readonly naynarService: NeynarService,
  ) {}

  @Post('/createhat')
  async createHat(@Body('trustedData') trustedData: { messageBytes: string }) {
    this.logger.log(this.createHat.name);
    const req = await this.naynarService.validateRequest(
      trustedData.messageBytes,
    );
    const address =
      req.action.signer.client.verified_addresses.eth_addresses[0];
    const { count } = await this.wihService.getWIHCount(address);
    this.wihService.createHat(address, count);
    this.wihService.incrementWIHCount(address);
  }

  @Post('/choosehat/:options')
  async chooseHat(
    @Body('trustedData') trustedData: { messageBytes: string },
    @Param('options') options: string,
  ) {
    this.logger.log(this.chooseHat.name);
    const req = await this.naynarService.validateRequest(
      trustedData.messageBytes,
    );
    const buttonIndex = req.action.tapped_button.index;
    const address =
      req.action.signer.client.verified_addresses.eth_addresses[0];
    const count = Number(options);
    const wihcount = await this.wihService.getWIHCount(address);
    if (count !== wihcount.count) {
      throw new BadRequestException('bad hat count');
    }
    const hat = this.wihService.createHat(address, count);
    if (hat.selected === buttonIndex) {
      const selection = hat.selection;
      const pubkey = Buffer.from(hat.pubkey).toString('hex');
      const signature = hat.signature.map((e) =>
        Buffer.from(e).toString('hex'),
      );
      const hash = hat.hash.map((e) => Buffer.from(e).toString('hex'));
      const proof = JSON.stringify({ selection, pubkey, signature, hash });
      await this.wihService.incrementWIHCount(address);
      await this.syndicateService.sendTransaction(
        FORWARDER_ADDRESS,
        666666666,
        'burnAndRedeemReward(address to, uint256 rewardValue, string memo)',
        { to: address, rewardValue: hat.reward, memo: proof },
      );
    } else {
      await this.syndicateService.sendTransaction(
        FORWARDER_ADDRESS,
        666666666,
        'burnAndRedeemLostNFT(address to)',
        { to: address },
      );
    }
  }

  @Get('/debug/:count')
  async chooseHatDebug(@Param('count') count: string) {
    const countnumber = Number(count);
    const address = '0xD0575cA24D907b35d39383a53c3300D510446BaE'.toLowerCase();
    const wihcount = await this.wihService.getWIHCount(address);
    if (wihcount.count !== countnumber) {
      throw new BadRequestException('bad hat number');
    }
    const hat = this.wihService.createHat(address, countnumber);
    const selected = 0;
    const selection = hat.selection;
    const pubkey = Buffer.from(hat.pubkey).toString('hex');
    const signature = hat.signature.map((e) =>
      Buffer.from(e).toString('hex'),
    );
    const hash = hat.hash.map((e) => Buffer.from(e).toString('hex'));
    // const proof = Buffer.from(JSON.stringify({ selection, pubkey, signature, hash })).toString('hex');
    const proof = JSON.stringify({ selection, pubkey, signature, hash });
    this.logger.debug(proof);
    if (hat.selected === selected) {
      await this.wihService.incrementWIHCount(address);
      const res = await this.syndicateService.sendTransaction(
        FORWARDER_ADDRESS,
        666666666,
        'burnAndRedeemReward(address to, uint256 rewardValue, string memo)',
        { to: address, rewardValue: hat.reward, memo: proof },
      );
      this.logger.debug(res);
    } else {
      await this.wihService.incrementWIHCount(address);
      const res = await this.syndicateService.sendTransaction(
        FORWARDER_ADDRESS,
        666666666,
        'burnAndRedeemLostNFT(address to)',
        { to: address },
      );
      this.logger.debug(res);
    }
  }
}
