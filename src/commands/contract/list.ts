import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'

import { configService } from '../../helpers/config-service'

export class ListCommand extends Command {
  static description = 'Display the list of known contracts.'

  static examples = ['eth contract:list']

  static flags = {
    json: flags.boolean({
      description: 'Display data in a json structure.',
      required: false,
      exclusive: ['table'],
    }),
    table: flags.boolean({
      description: 'Display data in a table structure.',
      required: false,
      exclusive: ['json'],
    }),
  }

  async run() {
    const { flags } = this.parse(ListCommand)
    const { table, json } = flags

    const displayAsTable = (!table && !json) || table
    const contracts: {
      [name: string]: { abi: string; address: string }
    } = configService.getContracts()
    if (displayAsTable) {
      const contractsList: any[] = []
      for (const [name, contract] of Object.entries(contracts)) {
        contractsList.push({ name, ...contract })
      }

      cli.table(
        contractsList,
        {
          name: {
            header: 'Name',
          },
          abi: {
            header: 'ABI',
          },
          address: {
            header: 'Address',
          },
        },
        {
          printLine: this.log,
          ...flags, // parsed flags
        },
      )
    } else {
      cli.styledJSON(contracts)
    }
  }
}
