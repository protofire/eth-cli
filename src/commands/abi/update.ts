import { Command } from '@oclif/command'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'
import { config } from '../../helpers/config'
import { loadABI } from '../../helpers/utils'

export class UpdateCommand extends Command {
  static description = 'Update a known ABI'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the ABI to add',
    },
    {
      name: 'abiPath',
      required: false,
      description: 'Path to the file with the ABI',
    },
  ]

  static examples = ['eth abi:update erc777 ./path/to/erc777.json']

  async run() {
    const { args, flags } = this.parse(UpdateCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    try {
      const { name, abiPath } = args

      const abis = config.get('abis', [])
      const abi = loadABI(abiPath)
      const index = abis.findIndex((item: any) => item.name.toLowerCase() === name.toLowerCase())
      if (index !== -1) {
        abis[index] = { name, abi }
        config.set('abis', abis)
      } else {
        this.warn(`No ABI found for '${name}'`)
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
