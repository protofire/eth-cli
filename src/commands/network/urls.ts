import { Command, flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { showDataWithDisplay } from '../../helpers/utils'

export default class UrlsCommand extends Command {
  async run() {
    const { flags } = this.parse(UrlsCommand)
    const { display = 'json' } = flags

    const { networkConstants } = await import('../../helpers/networks')
    const networksIds = Object.keys(networkConstants).reduce(
      (result, network) => {
        result[network] = networkConstants[network].url
        return result
      },
      {} as { [name: string]: string }
    )

    if (display === 'json') {
      cli.styledJSON(networksIds)
    } else {
      // cli.table does not work with this structure
      this.log(showDataWithDisplay(networksIds, 'table'))
    }
  }
}

UrlsCommand.description = `Show the network url for each known network.`

UrlsCommand.flags = {
  display: flags.string({
    description: 'How to display data, table or json.',
    required: false,
    options: ['table', 'json']
  })
}

UrlsCommand.examples = ['eth network:urls']
