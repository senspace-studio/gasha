export const DB_DOMAIN = process.env.DB_DOMAIN || 'db';
export const DB_PORT = Number(process.env.DB_PORT) || 3306;
export const DB_USERNAME = process.env.DB_USERNAME || 'admin';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
export const DB_NAME = process.env.DB_NAME || '';
export const NEYNER_API_KEY =
  process.env.NEYNER_API_KEY || '25E7274A-3A98-4FC8-BAE8-125B4C6999E2';
export const ZORA_API_ENDPOINT = process.env.ZORA_API_ENDPOINT || '';
export const ZORA_API_KEY = process.env.ZORA_API_ENDPOINT || '';
export const BLOCKCHAIN_API =
  process.env.BLOCKCHAIN_API || 'http://localhost:8545';
export const ERC1155_ADDRESS = process.env.ERC1155_ADDRESS || '0x';
export const GASHA_ADDRESS = process.env.GASHA_ADDRESS || '';
export const RUN_CRON = process.env.RUN_CRON === 'true';
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3001';
export const ADMIN_PRIVATE_KEY =
  process.env.ADMIN_PRIVATE_KEY ||
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
export const CHAIN_ID = Number(process.env.CHAIN_ID) || 31337;
export const UPDATE_SCORE_INTERVAL_MINUTES =
  Number(process.env.UPDATE_SCORE_INTERVAL_MINUTES) || 60;
