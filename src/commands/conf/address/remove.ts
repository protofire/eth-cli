import { Command } from '@oclif/command'

import { config } from '../../../helpers/config'

export class RemoveCommand extends Command {
  static description = 'Remove a known address'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the address to add',
    },
  ]

  static aliases = ['rm']

  static examples = ['eth conf:address:rm ganache1']

  async run() {
    const { args } = this.parse(RemoveCommand)
    const { name } = args

    const addresses = config.get('addresses', {})
    if (addresses[name]) {
      delete addresses[name]
      config.set('addresses', addresses)
    } else {
      this.warn(`No address found for '${name}'`)
    }
  }
}
