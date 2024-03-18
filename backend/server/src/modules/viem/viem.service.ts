import { Injectable } from '@nestjs/common';
import { BLOCKCHAIN_API, GASHA_ADDRESS } from 'src/utils/env';
import { http, createPublicClient, Chain, Address } from 'viem';
import { baseSepolia as chain } from 'viem/chains';
import { Gasha } from 'src/constants/Gasha';

export type SpinEvent = {
  minter: Address;
  ids: [bigint, bigint, bigint];
  quantities: [bigint, bigint, bigint];
};

@Injectable()
export class ViemService {
  private get client() {
    return createPublicClient({
      chain: chain as Chain,
      transport: http(BLOCKCHAIN_API),
    });
  }

  async getLatestBlockNumber() {
    return await this.client.getBlockNumber();
  }

  async getSpinEvents(fromBlock: bigint, toBlock: bigint) {
    const events = await this.client.getContractEvents({
      address: GASHA_ADDRESS as Address,
      abi: Gasha.abi,
      eventName: 'Spin',
      fromBlock: fromBlock,
      toBlock: toBlock,
    });
    return events;
  }

  async getBlockTimestampByBlockHash(blockHash: Address) {
    const block = await this.client.getBlock({ blockHash });
    return block.timestamp;
  }

  async getBlockTimestampByBlockNumber(blockNumber: bigint) {
    const block = await this.client.getBlock({ blockNumber });
    return block.timestamp;
  }

  async getContractEvent(
    eventName: string,
    fromBlock: bigint,
    toBlock: bigint,
  ) {
    const events = await this.client.getContractEvents({
      address: GASHA_ADDRESS as Address,
      abi: Gasha.abi,
      eventName,
      fromBlock: fromBlock,
      toBlock: toBlock,
    });
    return events;
  }
}
