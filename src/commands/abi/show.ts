import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'
import { getAbiByName } from '../../helpers/knownAbis'

export default class ShowCommand extends Command {
  static description = 'Displays a known ABI'

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'abi',
      required: false,
      description: 'The contract name.',
    },
  ]

  static examples = ['eth abi:show ERC20', 'eth abi:show ERC721']

  async run() {
    const { args, flags } = this.parse(ShowCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    const { abi } = args
    const abiObj = getAbiByName(abi)
    if (abiObj) {
      cli.styledJSON(abiObj)
    } else {
      this.error(`ABI for ${abi} not found!`)
    }
  }
}
