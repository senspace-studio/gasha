export interface Config {
  stage: string

  aws: {
    accountId: string
    region: string
  }

  clientURL: string

  dbSecretSuffix: string

  blockchainApi: string

  neynarApiKey: string

  contractAddress: {
    gasha: string
    erc1155: string
  }

  adminPrivateKey: string
  chainId: string

  updateScoreIntervalMinutes: string
}

export function getConfig(stage: string): Config {
  return require(`./${stage}.json`)
}
