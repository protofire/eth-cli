import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { getNetworks } from '../../helpers/config'

export default class ListCommand extends Command {
  static description = `Show information for each known network.`

  static aliases = ['networks']

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

  static examples = ['eth network:list --display json', 'eth networks']

  async run() {
    try {
      const { flags } = this.parse(ListCommand)
      const { table, json } = flags

      const networkConstants = getNetworks()

      // display as table by default
      const displayAsTable = (!table && !json) || table

      if (displayAsTable) {
        const networks = Object.values(networkConstants)
          .sort((network1, network2) => {
            if (network1.id !== undefined && network2.id !== undefined) {
              return network1.id - network2.id
            } else if (network1.id !== undefined) {
              return -1
            } else {
              return 1
            }
          })
          .map(network => ({
            ...network,
            id: network.id || '',
            label: network.label || '',
          }))
        cli.table(
          networks,
          {
            id: {
              header: 'Id',
              minWidth: 7,
            },
            name: {
              header: 'Name',
            },
            label: {
              header: 'Label',
            },
            url: {
              header: 'Url',
            },
          },
          {
            printLine: this.log,
            ...flags, // parsed flags
          },
        )
      } else {
        cli.styledJSON(networkConstants)
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
