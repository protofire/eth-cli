import { Command } from '@oclif/command'

import { configService } from '../../helpers/config-service'

export class UpdateCommand extends Command {
  static description = 'Update a known ABI.'

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

  static examples = ['eth abi:update erc777 ./path/to/erc777.json']

  async run() {
    const { args } = this.parse(UpdateCommand)

    try {
      const { name, abiPath } = args

      const abis = configService.getAbis()
      const { abi } = configService.loadABI(abiPath)
      if (abis[name]) {
        abis[name] = abi
        configService.updateAbis(abis)
      } else {
        this.warn(`No ABI found for '${name}'`)
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
