import { Command, flags } from '@oclif/command'

import { getAbiByName } from '../../helpers/knownAbis'

export default class ShowCommand extends Command {
  static description = 'Displays a known ABI (ERC20, ERC721)'

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
    const { abi } = args
    let abiStr: string | null = getAbiByName(abi)
    if (abiStr) {
      this.log(abiStr)
    } else {
      this.error(`ABI for ${abi} not found!`)
    }
  }
}
