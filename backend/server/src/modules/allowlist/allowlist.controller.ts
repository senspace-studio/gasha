import {
  Body,
  Controller,
  HttpException,
  Logger,
  Post,
  Redirect,
} from '@nestjs/common';
import { AllowlistService } from './allowlist.service';
import { NeynarService } from '../neynar/neynar.service';
import { ViemService } from '../viem/viem.service';
import { ValidateFrameActionResponse } from '@neynar/nodejs-sdk/build/neynar-api/v2';

@Controller('allowlist')
export class AllowlistController {
  private readonly logger = new Logger(AllowlistController.name);

  constructor(
    private readonly allowlistService: AllowlistService,
    private readonly neynarService: NeynarService,
    private readonly viemService: ViemService,
  ) {}

  @Post('/')
  @Redirect('', 307)
  async addAllowlist(@Body() body: any) {
    this.logger.log(this.addAllowlist.name);

    const allowlistNum = await this.allowlistService.allowlistCount();
    if (allowlistNum >= 1000) {
      return { url: `${process.env.CLIENT_URL}/frames/address/outofstock` };
    }

    let validatedData: ValidateFrameActionResponse;
    try {
      validatedData = await this.neynarService.validateRequest(
        body.trustedData.messageBytes,
      );
    } catch (error) {
      return { url: `${process.env.CLIENT_URL}/frames/address/error` };
    }
    const inputText = validatedData.action.input.text;
    const fid = validatedData.action.interactor.fid;

    const isExist = await this.allowlistService.existAllowlist(fid);
    if (isExist) {
      return { url: `${process.env.CLIENT_URL}/frames/address/alreadyclaimed` };
    }

    let address = '';

    if (
      !(inputText.startsWith('0x') && inputText.length !== 42) &&
      !inputText.endsWith('.eth')
    ) {
      return { url: `${process.env.CLIENT_URL}/frames/address/error` };
    } else if (inputText.endsWith('.eth')) {
      try {
        address = await this.viemService.lookupENS(inputText);
        if (!address) {
          return { url: `${process.env.CLIENT_URL}/frames/address/error` };
        }
      } catch (error) {
        return { url: `${process.env.CLIENT_URL}/frames/address/error` };
      }
    }

    const [following, recasted] = await Promise.all([
      this.neynarService.isUserFollowing(fid),
      this.neynarService.isUserRecasted(fid),
    ]);

    if (!following || !recasted) {
      return { url: `${process.env.CLIENT_URL}/frames/address/not-eligible` };
    }

    await this.allowlistService.addAllowlist(address, fid);

    return { url: `${process.env.CLIENT_URL}/frames/address/claimed` };
  }
}
