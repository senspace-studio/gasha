import { Injectable, Logger } from '@nestjs/common';
import { NeynarAPIClient, ReactionsType } from '@neynar/nodejs-sdk';
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

  async validateRequest(messageBytes: string) {
    try {
      this.logger.log('validateRequest', messageBytes);
      const result = await this.client.validateFrameAction(messageBytes);
      return result;
    } catch (error) {
      throw new Error('Invalid Request');
    }
  }

  async isUserFollowing(fid: number) {
    this.logger.log('isUserFollowing', fid);
    const followers = await this.client.fetchFollowersForAChannel('ball', {
      limit: 1000,
    });
    for (const follower of followers.users) {
      if (follower.fid == fid) return true;
    }
    return false;
  }

  async isUserRecasted(fid: number) {
    this.logger.log('isUserRecasted', fid);
    const recasts = await this.client.fetchUserReactions(
      fid,
      ReactionsType.Recasts,
      {
        limit: 100,
      },
    );
    for (const recast of recasts.reactions) {
      if (
        recast.cast?.embeds
          .map((embed: any) => embed.url)
          .includes(
            'https://zora.co/collect/zora:0xb5d00e222daad1b3030a6a1d0ce5f2edd8de7fd0/2?referrer=0xb17e447d0Eb15c444789886F2bff6A4907140bC5',
          )
      )
        return true;
    }
    return false;
  }
}
