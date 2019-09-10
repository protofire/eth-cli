import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class AddressCommand extends Command {
  static description = `Get the address for a contract created from the given <account> with the given <nonce>.`

  static args = [
    {
      name: 'account',
      required: false,
      description: 'The account.',
    },
    {
      name: 'nonce',
      description: 'The nonce.',
      default: '0',
    },
  ]

  static examples = ['eth ct:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03']

  static aliases = ['ct:a', 'ct:address']

  async run() {
    const { args, flags } = this.parse(AddressCommand)
    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    try {
      const { account, nonce } = args
      const { getContractAddress } = await import('../../helpers/getContractAddress')
      const contractAddress = getContractAddress(account, nonce)

      this.log(contractAddress)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
