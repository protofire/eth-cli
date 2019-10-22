import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

export class RandomCommand extends Command {
  static description = `Generate a random Ethereum address with its private key.`

  static args = [
    {
      name: 'amount',
      required: false,
      default: '1',
      description: 'Can be specified to generate a list of addresses.',
    },
  ]

  static flags = {
    prefix: flags.string(),
  }

  static examples = ['eth address:random', 'eth address:random 3', 'eth address:random --prefix aa']

  async run() {
    const { args, flags } = this.parse(RandomCommand)

    const { amount = '1' } = args
    const { prefix = '' } = flags

    const amountNumber = parseInt(amount, 10)

    try {
      const { randomAddress } = await import('../../helpers/randomAddress')
      randomAddress(amountNumber, prefix).forEach(({ address, privateKey }) =>
        cli.styledJSON({ address, privateKey }),
      )
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
