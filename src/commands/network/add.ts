import { Command, flags } from '@oclif/command'

import { getNetworks, updateNetworks } from '../../helpers/config'
import { NetworkInfo } from '../../types'

export class AddCommand extends Command {
  static description = 'Add a known network'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the network to add',
    },
  ]

  static flags = {
    url: flags.string({
      required: true,
    }),
    id: flags.string({
      required: false,
    }),
    label: flags.string({
      required: false,
    }),
  }

  static examples = ['eth network:add rsk --url https://public-node.rsk.co --id 30 --label RSK']

  async run() {
    const { args, flags } = this.parse(AddCommand)

    try {
      const { name } = args
      const { id, label, url } = flags

      const newNetwork: NetworkInfo = { name, url }
      if (id) {
        newNetwork.id = +id
      }
      if (label) {
        newNetwork.label = label
      }

      const networks = getNetworks()
      const index = networks.findIndex(network => network.name === name.toLowerCase())
      if (index === -1) {
        networks.push(newNetwork)
        updateNetworks(networks)
      } else {
        this.warn(`Network '${name}' already exists. Use network:update if you want to modify it.`)
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
