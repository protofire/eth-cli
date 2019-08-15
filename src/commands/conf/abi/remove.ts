import { Command } from '@oclif/command'

import { config } from '../../../helpers/config'

export class RemoveCommand extends Command {
  static description = 'Remove a known ABI'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the ABI to remove',
    },
  ]

  static aliases = ['conf:abi:rm']

  static examples = ['eth conf:abi:rm erc777']

  async run() {
    const { args } = this.parse(RemoveCommand)
    const { name } = args

    const abis = config.get('abis', [])
    const index = abis.findIndex((item: any) => item.name.toLowerCase() === name.toLowerCase())
    if (index !== -1) {
      abis.splice(index, 1)
      config.set('abis', abis)
    } else {
      this.warn(`No ABI found for '${name}'`)
    }
  }
}
