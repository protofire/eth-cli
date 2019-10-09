import { Command, flags } from '@oclif/command'
import cli from 'cli-ux'

import { getAddresses } from '../../helpers/config'

export class ListCommand extends Command {
  static description = 'List known addresses'

  static examples = ['eth address:list']

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
    const addresses: { [name: string]: object } = getAddresses()
    if (displayAsTable) {
      const addressesList: any[] = []
      for (const [name, addressPerNetwork] of Object.entries(addresses)) {
        for (const [networkId, addressObject] of Object.entries(addressPerNetwork)) {
          addressesList.push({
            networkId,
            name,
            ...addressObject,
          })
        }
      }

      cli.table(
        addressesList,
        {
          networkId: {
            header: 'Network',
          },
          name: {
            header: 'Name',
          },
          address: {
            header: 'Address',
          },
          privateKey: {
            header: 'Private key',
            get: row => row.privateKey || '',
          },
        },
        {
          printLine: this.log,
          ...flags, // parsed flags
        },
      )
    } else {
      cli.styledJSON(addresses)
    }
  }
}
