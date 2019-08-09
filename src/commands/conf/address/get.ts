import { Command } from '@oclif/command'
import cli from 'cli-ux'

import { config } from '../../../helpers/config'

export class GetCommand extends Command {
  static description = 'Get a known address'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the address to get',
    },
  ]

  static examples = ['eth conf:address:get ganache1']

  async run() {
    const { args } = this.parse(GetCommand)
    const { name } = args

    const addresses = config.get('addresses', {})
    if (addresses[name]) {
      cli.styledJSON(addresses[name])
    } else {
      this.warn(`No address found for '${name}'`)
    }
  }
}
