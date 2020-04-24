import { Command } from '@oclif/command'

import { configService } from '../../helpers/config-service'

export class AddCommand extends Command {
  static description = 'Add a known ABI.'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the ABI to add',
    },
    {
      name: 'abiPath',
      required: true,
      description: 'Path to the file with the ABI',
    },
  ]

  static examples = ['eth abi:add erc777 ./path/to/erc777.json']

  async run() {
    const { args } = this.parse(AddCommand)

    try {
      const { name, abiPath } = args

      const abis = configService.getAbis()
      const { abi } = configService.loadABI(abiPath)
      if (abis[name]) {
        this.warn(`ABI '${name}' already exists. Use abi:update if you want to modify it.`)
      } else {
        abis[name] = abi
        configService.updateAbis(abis)
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
