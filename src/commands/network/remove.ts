import { Command } from '@oclif/command'
import _ from 'lodash'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'
import { getNetworks, updateNetworks } from '../../helpers/config'

export class RemoveCommand extends Command {
  static description = 'Remove a known network'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the network to remove',
    },
  ]

  static examples = ['eth network:remove rsk']

  async run() {
    const { args, flags } = this.parse(RemoveCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    const { name } = args
    const networks = getNetworks()
    const index = _.findIndex(networks, { name })
    if (index !== -1) {
      networks.splice(index, 1)
      updateNetworks(networks)
    } else {
      this.warn(`No network found for '${name}'`)
    }
  }
}
