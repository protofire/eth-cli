import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { loadABI } from '../../helpers/utils'

export default class ShowCommand extends Command {
  static description = 'Display a known ABI'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'abi',
      required: true,
      description: 'The contract name.',
    },
  ]

  static examples = ['eth abi:show ERC20', 'eth abi:show ERC721']

  async run() {
    const { args } = this.parse(ShowCommand)

    const { abi: abiArg } = args
    const { abi } = loadABI(abiArg)
    if (abi) {
      cli.styledJSON(abi)
    } else {
      this.error(`ABI for ${abiArg} not found!`)
    }
  }
}
