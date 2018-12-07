const { Command } = require('@oclif/command')
const randomAddress = require('../helpers/randomAddress')
const { cli } = require('cli-ux')

class RandomAddressCommand extends Command {
  async run() {
    const { args } = this.parse(RandomAddressCommand)
    const { amount = 1, prefix = '' } = args

    try {
      randomAddress(amount, prefix).forEach(account => cli.styledJSON(account))
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

RandomAddressCommand.aliases = ['ra']

RandomAddressCommand.description = `Prints a random Ethereum checksum address with its Private Key.`

RandomAddressCommand.args = [
  {
    name: 'amount',
    required: false,
    default: 1,
    description: 'Can be specified to generate a list of addresses.'
  },
  {
    name: 'prefix',
    required: false,
    default: '',
    description: 'Generates a random address with the given prefix.'
  }
]

RandomAddressCommand.examples = ['eth randomAddress 10 fd', 'eth randomAddress 2']

module.exports = RandomAddressCommand
