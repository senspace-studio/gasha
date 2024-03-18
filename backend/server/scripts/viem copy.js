/* eslint-disable @typescript-eslint/no-var-requires */
const { http, createPublicClient } = require('viem');
const { zoraSepolia } = require('viem/chains');
// const abi = require('./ZoraCreator1155Impl.json').abi;
const abi = require('./Gasha.json').abi;

const main = async () => {
  const client = createPublicClient({
    chain: zoraSepolia,
    transport: http(),
  });
  const blockNumber = await client.getBlockNumber();
  console.log(blockNumber);
  const accAddress = '0x77777773dE7607C8d2eF571ba03ab22a7df64CEA';
  // NFT
  const address = '0xd12175C64D479e9e3d09B9B29889A36C0942bD4d';
  // NFT
  // const address = '0x4eb681AD4316de973fDb1bCdA6FdBFA5a2Dc5FaD';
  // const logs = await client.getContractEvents({
  //   address: nftAddress,
  //   abi: abi,
  // });
  const logs = await client.getLogs({
    address: address,
  });
  // const logs = await client.getLogs();
  console.log(logs);
  const events = await client.getContractEvents({
    address: address,
    abi: abi,
    fromBlock: 6213171n - 5n,
    toBlock: 6213171n + 5n,
  });
  console.log(events);
  const balance = await client.getBalance({ address: accAddress });
  console.log(balance);
};
main();
