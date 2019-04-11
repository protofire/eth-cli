import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { showDataWithDisplay } from '../../helpers/utils'

export default class IdsCommand extends Command {
  async run() {
    const { flags } = this.parse(IdsCommand)
    const { display = 'json' } = flags

    const { networkConstants } = await import('../../helpers/networks')
    const networksIds = Object.keys(networkConstants).reduce((result, network) => {
      result[network] = networkConstants[network].id
      return result
    }, {} as {[name: string]: number})

    if (display === 'json') {
      cli.styledJSON(networksIds)
    } else {
      // cli.table does not work with this structure
      this.log(showDataWithDisplay(networksIds, 'table'))
    }
  }
}

IdsCommand.description = `Show the network id for each known network.`

IdsCommand.flags = {
  display: flags.string({
    description: 'How to display data, table or json.',
    required: false,
    options: ['table', 'json']
  })
}

IdsCommand.examples = ['eth network:ids']
