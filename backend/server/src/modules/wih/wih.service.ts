import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WIHCountEntity } from 'src/entities/wih_count.entity';
import nacl from 'tweetnacl';
import { Repository } from 'typeorm';

const secret = '';
const bonusTable = [
  { percentage: 2, value: 100000 },
  { percentage: 3, value: 5000 },
  { percentage: 35, value: 500 },
  { percentage: 60, value: 100 },
].sort((a, b) => a.percentage - b.percentage);

@Injectable()
export class WIHService {
  constructor(
    @InjectRepository(WIHCountEntity)
    private readonly wihCountRepositry: Repository<WIHCountEntity>,
  ) {}

  createHat(address: string, count: number) {
    const kp = nacl.sign.keyPair.fromSeed(Buffer.from(secret));
    const base = Buffer.from(`${address}_${count}`);
    const seed = nacl.sign(base, kp.secretKey);
    const valueIndex = this.randomFromSeed(seed, 100);
    const bonus = bonusTable.filter((e) => 100 - e.percentage <= valueIndex)[0];
    const selectedIndex = this.randomFromSeed(seed, 3);

    const selection = [
      `${address}_${count}_0_${selectedIndex === 0 ? bonus.value : 0}`,
      `${address}_${count}_1_${selectedIndex === 1 ? bonus.value : 0}`,
      `${address}_${count}_2_${selectedIndex === 2 ? bonus.value : 0}`,
    ];
    const signature = selection
      .map((e) => Buffer.from(e))
      .map((e) => nacl.sign(e, kp.secretKey));
    const hash = signature.map((e) => nacl.hash(e));
    return { signature, hash };
  }

  randomFromSeed(seed: Uint8Array, length: number) {
    const hash = nacl.hash(seed);
    const index = hash.reduce((prev, current) => {
      return (prev + current) % length;
    });
    return index;
  }
}
