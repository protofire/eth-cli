import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { BaseCommand } from '../base/index'
import { showDataWithDisplay } from '../helpers/utils'

export default class NetworksCommand extends Command {
  static description = `Show information for each known network.`

  static flags = {
    display: flags.string({
      description: 'How to display data, table or json.',
      required: false,
      options: ['table', 'json'],
    }),
  }

  static examples = ['eth networks --display json']

  async run() {
    const { flags } = this.parse(NetworksCommand)
    const { display = 'json' } = flags

    const networkConstants = BaseCommand.getNetworksInfo()

    if (display === 'json') {
      cli.styledJSON(networkConstants)
    } else {
      // cli.table does not work with this structure
      this.log(showDataWithDisplay(networkConstants, 'table'))
    }
  }
}
