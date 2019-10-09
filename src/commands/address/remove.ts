import { Command, flags } from '@oclif/command'

import { getAddresses, updateAddresses } from '../../helpers/config'

export class RemoveCommand extends Command {
  static description = 'Remove a known address'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the address to remove',
    },
  ]

  static flags = {
    'network-id': flags.string({
      char: 'n',
      required: false,
      default: '*',
    }),
  }

  static aliases = ['rm']

  static examples = ['eth address:rm ganache1']

  async run() {
    const { args, flags } = this.parse(RemoveCommand)

    const { name } = args
    const { 'network-id': networkId } = flags
    const addresses = getAddresses()
    if (addresses[name] && addresses[name][networkId]) {
      delete addresses[name][networkId]
      updateAddresses(addresses)
    } else {
      this.warn(`No address found for '${name}'`)
    }
  }
}
