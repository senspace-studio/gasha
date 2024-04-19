import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WIHCountEntity } from 'src/entities/wih_count.entity';
import { WIH_SIGN_SECKEY } from 'src/utils/env';
import { sign as naclSign } from 'tweetnacl';
import { hash as naclHash } from 'tweetnacl';
import { Repository } from 'typeorm';

const secret = WIH_SIGN_SECKEY;

// const rewardTable = [
//   { percentage: 2, value: 100000 },
//   { percentage: 5, value: 5000 },
//   { percentage: 40, value: 500 },
//   { percentage: 100, value: 100 },
// ].sort((a, b) => a.percentage - b.percentage);
const rewardTable = [
  { percentage: 2, value: 10 },
  { percentage: 5, value: 20 },
  { percentage: 40, value: 30 },
  { percentage: 100, value: 40 },
].sort((a, b) => a.percentage - b.percentage);

@Injectable()
export class WIHService {
  constructor(
    @InjectRepository(WIHCountEntity)
    private readonly wihCountRepositry: Repository<WIHCountEntity>,
  ) {}

  async getWIHCount(address: string) {
    address = address.toLowerCase();
    const wihcount = await this.wihCountRepositry.findOne({
      where: { address },
    });
    return wihcount || { address, count: 0 };
  }

  async initWIHCount(address: string) {
    const count = await this.getWIHCount(address);
    if (!count || count.count === 0) {
      await this.wihCountRepositry.save({ address, count: 0 });
    }
  }

  async incrementWIHCount(address: string) {
    const count = await this.getWIHCount(address);
    if (!count) {
      await this.wihCountRepositry.save({ address, count: 1 });
    } else {
      await this.wihCountRepositry.save({ address, count: count.count + 1 });
    }
  }

  createHat(address: string, count: number) {
    address = address.toLowerCase();
    const kp = naclSign.keyPair.fromSeed(naclHash(Buffer.from(secret)).subarray(0, naclSign.seedLength));
    const base = Buffer.from(`${address}_${count}`);
    const seed = naclSign(base, kp.secretKey);
    const valueIndex = this.randomFromSeed(seed, 100);
    const reward = rewardTable.filter(
      (e) => { console.log(e.percentage); return 100 - e.percentage <= valueIndex },
    )[0];
    const selected = this.randomFromSeed(seed, 3);
    const selection = [
      `${address}_${count}_0_${selected === 0 ? reward.value : 0}`,
      `${address}_${count}_1_${selected === 1 ? reward.value : 0}`,
      `${address}_${count}_2_${selected === 2 ? reward.value : 0}`,
    ];
    const signature = selection
      .map((e) => Buffer.from(e))
      .map((e) => naclSign(e, kp.secretKey));
    const hash = signature.map((e) => naclHash(e));
    return {
      selection,
      signature,
      hash,
      count,
      reward,
      selected,
      pubkey: kp.publicKey,
    };
  }

  randomFromSeed(seed: Uint8Array, length: number) {
    const hash = naclHash(seed);
    const index = hash.reduce((prev, current) => {
      return (prev + current) % length;
    });
    return index;
  }
}
