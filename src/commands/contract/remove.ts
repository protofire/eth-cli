import { Command } from '@oclif/command'

import { configService } from '../../helpers/config-service'

export class RemoveCommand extends Command {
  static description = 'Remove a known contract.'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the contract to remove',
    },
  ]

  static aliases = ['contract:rm']

  static examples = ['eth contract:rm usdc']

  async run() {
    const { args } = this.parse(RemoveCommand)

    const { name } = args
    const deleted = configService.removeContract(name)
    if (!deleted) {
      this.warn(`No contract found for '${name}'`)
    }
  }
}
