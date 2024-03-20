export interface Config {
  stage: string

  aws: {
    accountId: string
    region: string
  }

  dbSecretSuffix: string
}

export function getConfig(stage: string): Config {
  return require(`./${stage}.json`)
}
