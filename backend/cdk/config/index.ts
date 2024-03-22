export interface Config {
  stage: string

  aws: {
    accountId: string
    region: string
  }

  dbSecretSuffix: string

  blockchainApi: string

  contractAddress: {
    gasha: string
    erc1155: string
  }
}

export function getConfig(stage: string): Config {
  return require(`./${stage}.json`)
}
