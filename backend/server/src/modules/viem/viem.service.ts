import { Injectable } from '@nestjs/common';
import { BLOCKCHAIN_API, GASHA_ADDRESS } from 'src/utils/env';
import {
  http,
  createPublicClient,
  Chain,
  Address,
  getContract,
  createWalletClient,
  parseEther,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { baseSepolia as chain, mainnet } from 'viem/chains';
import { Gasha, GashaABI } from 'src/constants/Gasha';
import { SeriesItem } from 'src/types/contract';

@Injectable()
export class ViemService {
  private get client() {
    return createPublicClient({
      chain: { ...chain, fees: { baseFeeMultiplier: 1.5 } } as Chain,
      transport: http(BLOCKCHAIN_API),
    });
  }

  private get walletClient() {
    return createWalletClient({
      chain: chain as Chain,
      transport: http(BLOCKCHAIN_API),
    });
  }

  private get adminAccount() {
    return privateKeyToAccount(process.env.ADMIN_PRIVATE_KEY as Address);
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

  async dropByAdmin(address: Address, tokenId: number) {
    try {
      const { request } = await this.client.simulateContract({
        address: GASHA_ADDRESS as Address,
        abi: GashaABI,
        account: this.adminAccount,
        functionName: 'dropByOwner',
        args: [address, [BigInt(tokenId)], [BigInt(1)]],
        value: parseEther('0.000777'),
      });

      await this.walletClient.writeContract(request);
    } catch (error) {
      throw error;
    }
  }
}
