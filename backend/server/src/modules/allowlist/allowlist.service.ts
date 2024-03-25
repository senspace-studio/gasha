import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllowlistEntity } from 'src/entities/allowlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AllowlistService {
  constructor(
    @InjectRepository(AllowlistEntity)
    private readonly allowlistRepository: Repository<AllowlistEntity>,
  ) {}

  async existAllowlist(fid: number) {
    return await this.allowlistRepository.exists({
      where: {
        fid,
      },
    });
  }

  async addAllowlist(address: string, fid: number) {
    return await this.allowlistRepository.save({ address, fid });
  }

  async allowlistCount() {
    return await this.allowlistRepository.count();
  }
}
