import { Command } from '@oclif/command'

import { configService } from '../../helpers/config-service'

export class RemoveCommand extends Command {
  static description = 'Remove a known network.'

  static aliases = ['network:rm']

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the network to remove',
    },
  ]

  static examples = ['eth network:remove rsk']

  async run() {
    const { args } = this.parse(RemoveCommand)

    const { name } = args
    const networks = configService.getNetworks()
    if (networks[name]) {
      delete networks[name]
      configService.updateNetworks(networks)
    } else {
      this.warn(`No network found for '${name}'`)
    }
  }
}
