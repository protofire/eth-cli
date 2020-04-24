import { Command, flags } from '@oclif/command'

import { configService } from '../../helpers/config-service'
import { NetworkInfo } from '../../types'

export class AddCommand extends Command {
  static description = 'Add a known network.'

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

      const newNetwork: NetworkInfo = { url }
      if (id) {
        newNetwork.id = +id
      }
      if (label) {
        newNetwork.label = label
      }

      const networks = configService.getNetworks()
      if (networks[name]) {
        this.warn(`Network '${name}' already exists. Use network:update if you want to modify it.`)
      } else {
        networks[name] = newNetwork
        configService.updateNetworks(networks)
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
