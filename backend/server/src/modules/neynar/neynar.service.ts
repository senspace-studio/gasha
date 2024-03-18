import { Injectable, Logger } from '@nestjs/common';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { NEYNER_API_KEY } from 'src/utils/env';

@Injectable()
export class NeynarService {
  private readonly logger = new Logger(NeynarService.name);

  private get client() {
    return new NeynarAPIClient(NEYNER_API_KEY);
  }

  async getUserInfo(address: string) {
    this.logger.log('getUserInfo', address);
    const users = await this.client.fetchBulkUsersByEthereumAddress([address]);
    return users[0];
  }
}
