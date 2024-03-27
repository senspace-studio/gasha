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
  async addAllowlist(@Body() body: any) {
    console.log(body);
    this.logger.log(this.addAllowlist.name);

    const allowlistNum = await this.allowlistService.allowlistCount();
    if (allowlistNum >= 150) {
      throw new HttpException('Allowlist is full', 400);
    }

    let validatedData: ValidateFrameActionResponse;
    try {
      validatedData = await this.neynarService.validateRequest(
        body.trustedData.messageBytes,
      );
      console.log(validatedData);
    } catch (error) {
      throw new HttpException('Invalid request', 400);
    }
    const inputText = validatedData.action.input.text;
    const fid = validatedData.action.interactor.fid;

    const isExist = await this.allowlistService.existAllowlist(fid);
    if (isExist) {
      throw new HttpException('Already claimed', 400);
    }

    let address = '';

    if (
      !(inputText.startsWith('0x') && inputText.length === 42) &&
      !inputText.endsWith('.eth')
    ) {
      throw new HttpException('Invalid request', 400);
    } else if (inputText.endsWith('.eth')) {
      try {
        address = await this.viemService.lookupENS(inputText);
        if (!address) {
          throw new HttpException('Invalid request', 400);
        }
      } catch (error) {
        throw new HttpException('Invalid request', 400);
      }
    } else {
      address = inputText;
    }

    const recasted = await this.neynarService.isUserRecasted(fid);

    if (!recasted) {
      throw new HttpException('Is not eligible', 400);
    }

    try {
      await this.allowlistService.addAllowlist(address, fid);
    } catch (error) {
      throw new HttpException('Failed to add allowlist', 400);
    }

    return { success: true };
  }
}
