import { Command, flags } from '@oclif/command'

import { getAbiByName } from '../helpers/abi/knowAbis'

export default class Abi extends Command {
  static description = 'Displays the abi of a given well-know abi (ERC20, ERC721)'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'abi',
      required: true,
      description: 'The contract abi name.',
    },
  ]

  static examples = ['eth abi ERC20', 'eth abi ERC721']

  async run() {
    const { args } = this.parse(Abi)
    const { abi } = args
    let abiStr: string | null = getAbiByName(abi)
    if (abiStr) {
      this.log(abiStr)
    } else {
      this.error(`Abi for ${abi} not found!`)
    }
  }
}
