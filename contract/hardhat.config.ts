import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import 'dotenv/config'

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
    ],
  },
  networks: {
    local: {
      accounts: [process.env.LOCAL_PRIVATE_KEY!],
      url: 'http://localhost:8545',
    },
    base_sepolia: {
      accounts: [process.env.TEST_PRIVATE_KEY!],
      url: 'https://base-sepolia.g.alchemy.com/v2/5kVob7zDOtjcG4NjjhECSAFH15_LVZsk',
    },
    zora_sepolia: {
      accounts: [process.env.TEST_PRIVATE_KEY!],
      url: 'https://sepolia.rpc.zora.energy',
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    customChains: [
      {
        network: 'zora_sepolia',
        chainId: 999999999,
        urls: {
          apiURL:
            'https://api.routescan.io/v2/network/testnet/evm/999999999/etherscan',
          browserURL: 'https://sepolia.zorascan.xyz',
        },
      },
      {
        network: 'base_sepolia',
        chainId: 84532,
        urls: {
          apiURL: 'https://api-sepolia.basescan.org/api',
          browserURL: 'https://sepolia.basescan.org',
        },
      },
    ],
    apiKey: {
      zora_sepolia: 'zora_sepolia',
      base_sepolia: 'NFUIZFQWPD5UJ6VZ5HDHQ6M3P36Z7SJZZF',
    },
  },
}

export default config