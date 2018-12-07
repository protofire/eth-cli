const { Command, flags } = require('@oclif/command')
const { networkConstants } = require('../../helpers/networks')
const { cli } = require('cli-ux')
const { showDataWithDisplay } = require('../../helpers/utils')

class IdsCommand extends Command {
  async run() {
    const { flags } = this.parse(IdsCommand)
    const { display = 'json' } = flags

    const networksIds = Object.keys(networkConstants).reduce((result, network) => {
      result[network] = networkConstants[network].id
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

IdsCommand.description = `Show the network id for each known network.`

IdsCommand.flags = {
  display: flags.string({
    description: 'How to display data, table or json.',
    required: false,
    options: ['table', 'json']
  })
}

IdsCommand.examples = ['eth network:ids']

module.exports = IdsCommand
