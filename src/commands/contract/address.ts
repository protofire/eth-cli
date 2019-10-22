import { Command, flags } from '@oclif/command'

export default class AddressCommand extends Command {
  static description = `Get the address for a contract created from the given account.`

  static args = [
    {
      name: 'account',
      required: true,
      description: 'The address that will deploy the contract..',
    },
  ]

  static flags = {
    nonce: flags.string({
      description: 'The nonce of the address that will deploy the contract.',
    }),
  }

  static examples = [
    'eth contract:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03',
    'eth contract:address 0x92970dbD5C0Ee6b439422bFd7cD71e1DDA921A03 --nonce 5',
  ]

  async run() {
    const { args, flags } = this.parse(AddressCommand)

    try {
      const { account } = args
      const { nonce = '0' } = flags
      const { getContractAddress } = await import('../../helpers/getContractAddress')
      const contractAddress = getContractAddress(account, nonce)

      this.log(contractAddress)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
