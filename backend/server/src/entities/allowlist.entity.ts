import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  // UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'allowlist' })
export class AllowlistEntity {
  @PrimaryColumn()
  readonly fid: number;

  @PrimaryColumn()
  readonly address: string;

  @Column()
  readonly tokenId: number;

  @Column()
  readonly status: 'claimed' | 'pending' | 'minted' | 'failed';

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    precision: 0,
  })
  readonly createdAt: Date;
}
