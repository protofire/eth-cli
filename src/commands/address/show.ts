import { Command } from '@oclif/command'
import cli from 'cli-ux'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'
import { config } from '../../helpers/config'

export class ShowCommand extends Command {
  static description = 'Displays a known address'

  static args = [
    {
      name: 'name',
      required: false,
      description: 'Name of the address to get',
    },
  ]

  static examples = ['eth address:get ganache1']

  async run() {
    const { args, flags } = this.parse(ShowCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    const { name } = args
    const addresses = config.get('addresses', {})
    if (addresses[name]) {
      cli.styledJSON(addresses[name])
    } else {
      this.warn(`No address found for '${name}'`)
    }
  }
}
