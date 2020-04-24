import { Command } from '@oclif/command'
import cli from 'cli-ux'

import { configService } from '../../helpers/config-service'

export class ShowCommand extends Command {
  static description = 'Display a known contract.'

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Name of the contract to show',
    },
  ]

  static examples = ['eth contract:show usdc']

  async run() {
    const { args } = this.parse(ShowCommand)

    const { name } = args
    const contract = configService.getContract(name)
    if (contract) {
      cli.styledJSON(contract)
    } else {
      this.warn(`No contract found for '${name}'`)
    }
  }
}
