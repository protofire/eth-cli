const { Command, flags } = require('@oclif/command')
const { networkConstants } = require('../../helpers/networks')
const { cli } = require('cli-ux')
const { showDataWithDisplay } = require('../../helpers/utils')

class UrlsCommand extends Command {
  async run() {
    const { flags } = this.parse(UrlsCommand)
    const { display = 'json' } = flags

    const networksIds = Object.keys(networkConstants).reduce((result, network) => {
      result[network] = networkConstants[network].url
      return result
    }, {})

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

module.exports = UrlsCommand
