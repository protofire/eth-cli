import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export class RandomCommand extends Command {
  static description = `Prints a random Ethereum checksum address with its Private Key.`

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

  static examples = ['eth randomAddress 10 fd', 'eth randomAddress 2']

  static aliases = ['ra']

  async run() {
    const { args, flags } = this.parse(RandomCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

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
