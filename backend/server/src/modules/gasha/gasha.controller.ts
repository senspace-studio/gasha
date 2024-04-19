import {
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { SyndicateService } from '../syndicate/syndicate.service';
import {
  CHAIN_ID,
  GASHA_ADDRESS,
  SYNDICATE_API_KEY,
  SYNDICATE_PROJECT_ID,
} from 'src/utils/env';
import { NeynarService } from '../neynar/neynar.service';
import { ViemService } from '../viem/viem.service';
import { parseEventLogs } from 'viem';
import { GashaABI } from 'src/constants/Gasha';

@Controller('gasha')
export class GashaController {
  private readonly logger = new Logger(GashaController.name);
  constructor(
    private readonly syndicateService: SyndicateService,
    private readonly neynarService: NeynarService,
    private readonly viemService: ViemService,
  ) {}

  @Post('/syndicate/spin')
  async spinGasha(
    @Body('messageBytes') messageBytes: string,
    @Body('numOfMint') numOfMint: number,
  ) {
    this.logger.log(this.spinGasha.name);

    const res = await this.neynarService.validateRequest(messageBytes);

    const address = res.action.interactor.verified_addresses.eth_addresses[0];
    const quantity = numOfMint;

    if (!address) {
      this.logger.error('Verified address not found');
      throw new Error('Verified address not found');
    } else if (
      typeof quantity !== 'number' ||
      isNaN(quantity) ||
      !(0 < numOfMint && numOfMint < 1000)
    ) {
      this.logger.error('Invalid input quantity');
      throw new Error('Invalid input quantity');
    }

    const transactionId = await this.syndicateService.sendTransaction(
      GASHA_ADDRESS,
      CHAIN_ID,
      'spin(uint256 quantity, address to)',
      {
        quantity: quantity,
        to: address,
      },
    );

    return { transactionId };
  }

  @Get('/syndicate/spin/result/:txId')
  async getSpinResult(@Param('txId') txId: string) {
    this.logger.log(this.getSpinResult.name);

    try {
      const tx = await (
        await fetch(
          `https://api.syndicate.io/wallet/project/${SYNDICATE_PROJECT_ID}/request/${txId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${SYNDICATE_API_KEY}`,
            },
          },
        )
      ).json();

      const txHash = tx.transactionAttempts[0].hash;

      const txReceipt =
        await this.viemService.getContractTransactionReceipt(txHash);

      const events = parseEventLogs({
        abi: GashaABI,
        logs: txReceipt.logs,
      });

      const spinEvent: any = events.find((event) => event.eventName === 'Spin');

      if (!spinEvent) {
        throw new HttpException('Event not found', 404);
      }

      const result = {
        minter: spinEvent.args.minter,
        ids: spinEvent.args.ids.map((id) => Number(id)),
        quantities: spinEvent.args.quantities.map((quantity) =>
          Number(quantity),
        ),
      };

      return result;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException('Internal server error', 500);
    }
  }
}
