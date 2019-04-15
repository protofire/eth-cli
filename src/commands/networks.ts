import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { BaseCommand } from '../base/index'

export default class NetworksCommand extends Command {
  static description = `Show information for each known network.`

  static flags = {
    json: flags.boolean({
      description: 'Display data in a json structure.',
      required: false,
    }),
    table: flags.boolean({
      description: 'Display data in a table structure.',
      required: false,
    }),
  }

  static examples = ['eth networks --display json']

  async run() {
    const { flags } = this.parse(NetworksCommand)
    const { table } = flags

    const networkConstants = BaseCommand.getNetworksInfo()

    if (!table) {
      cli.styledJSON(networkConstants)
    } else {
      const networks = Object.values(networkConstants).sort((network1, network2) => {
        return network1.id - network2.id
      })
      cli.table(
        networks,
        {
          id: {
            minWidth: 7,
            label: 'ID',
          },
          label: {
            header: 'Name',
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
    }
  }
}
