import { Command } from '@oclif/command'

export default class AddressCommand extends Command {
  async run() {
    const { args } = this.parse(AddressCommand)

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

AddressCommand.aliases = ['ct:a', 'ct:address']

AddressCommand.description = `Get the address for a contract created from the given <account> with the given <nonce>.`

AddressCommand.args = [
  {
    name: 'account',
    required: true,
    description: 'The account.'
  },
  {
    name: 'nonce',
    description: 'The nonce.',
    default: '0'
  }
]

AddressCommand.examples = ['eth ct:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03']
