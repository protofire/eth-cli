import { flags } from '@oclif/command'

export const privateKeyFlag = flags.string({
  description:
    'Private key to unlock. Can also be specified using the ETH_CLI_PRIVATE_KEY environment variable.',
  env: 'ETH_CLI_PRIVATE_KEY',
})

export const confirmationBlocksFlag = flags.integer({
  default: 0,
  description: 'Number of confirmation blocks to wait for before the command returns.',
})
