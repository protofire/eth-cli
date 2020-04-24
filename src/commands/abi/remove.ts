import { Command } from '@oclif/command'

import { configService } from '../../helpers/config-service'

export class RemoveCommand extends Command {
  static description = 'Remove a known ABI.'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the ABI to remove',
    },
  ]

  static aliases = ['abi:rm']

  static examples = ['eth abi:rm erc777']

  async run() {
    const { args } = this.parse(RemoveCommand)

    const { name } = args

    const abis = configService.getAbis()
    if (abis[name]) {
      delete abis[name]
      configService.updateAbis(abis)
    } else {
      this.warn(`No ABI found for '${name}'`)
    }
  }
}
