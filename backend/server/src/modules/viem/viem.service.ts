import { Injectable } from '@nestjs/common';
import { BLOCKCHAIN_API, GASHA_ADDRESS } from 'src/utils/env';
import { http, createPublicClient, Chain, Address, getContract } from 'viem';
import { baseSepolia as chain, mainnet } from 'viem/chains';
import { Gasha } from 'src/constants/Gasha';
import { SeriesItem } from 'src/types/contract';

@Injectable()
export class ViemService {
  private get client() {
    return createPublicClient({
      chain: chain as Chain,
      transport: http(BLOCKCHAIN_API),
    });
  }

  private get ensResolverClient() {
    return createPublicClient({
      chain: mainnet,
      transport: http(),
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

  async getSeriesItems() {
    const contract = getContract({
      address: GASHA_ADDRESS as Address,
      abi: Gasha.abi,
      client: this.client as any,
    }) as any;
    const res = await contract.read.seriesItems();
    return res as SeriesItem[];
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

  async lookupENS(ens: string) {
    try {
      const resolvedAddress = await this.ensResolverClient.getEnsAddress({
        name: ens,
      });

      return resolvedAddress;
    } catch (error) {
      throw new Error('Invalid address');
    }
  }
}
