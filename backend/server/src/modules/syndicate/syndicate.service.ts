import { Injectable } from '@nestjs/common';
import { SyndicateClient } from '@syndicateio/syndicate-node';
import { SYNDICATE_API_KEY, SYNDICATE_PROJECT_ID } from 'src/utils/env';

@Injectable()
export class SyndicateService {
  private get client() {
    return new SyndicateClient({ token: SYNDICATE_API_KEY });
  }
  async sendTransaction(
    contractAddress: string,
    chainId: number,
    functionSignature: string,
    args: Record<string, unknown>,
  ) {
    const { transactionId } = await this.client.transact.sendTransaction(
      {
        projectId: SYNDICATE_PROJECT_ID,
        contractAddress,
        chainId,
        functionSignature,
        args,
      },
      {},
    );
    return transactionId;
  }
}
