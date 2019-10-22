import { Command, flags } from '@oclif/command'

import { getNetworks, updateNetworks } from '../../helpers/config'

export class UpdateCommand extends Command {
  static description = 'Update a known network.'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the network to update',
    },
  ]

  static flags = {
    url: flags.string({
      required: false,
    }),
    id: flags.string({
      required: false,
    }),
    label: flags.string({
      required: false,
    }),
  }

  static examples = ['eth network:update rsk --id 30']

  async run() {
    const { args, flags } = this.parse(UpdateCommand)

    try {
      const { name } = args
      const { id, label, url } = flags

      const networks = getNetworks()
      if (networks[name]) {
        const network = networks[name]
        if (url) {
          network.url = url
        }
        if (id) {
          network.id = +id
        }
        if (label) {
          network.label = label
        }
        networks[name] = network
        updateNetworks(networks)
      } else {
        this.warn(`No network found for '${name}'`)
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
