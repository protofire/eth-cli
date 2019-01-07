const Command = require('../../base')
const { cli } = require('cli-ux')
const { getNetworkFlags } = require('../../helpers/networks')

class NopCommand extends Command {
  async run() {
    const { args, flags } = this.parse(NopCommand)
    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { pk } = args
      const generateNop = require('../../helpers/generateNop')
      const tx = await generateNop(networkUrl, pk)

      cli.styledJSON(tx)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

NopCommand.aliases = ['tx:nop']

NopCommand.description = `Generates a transaction that does nothing with the given private key.`

NopCommand.args = [
  {
    name: 'pk',
    required: true,
    description: 'The private key.'
  }
]

NopCommand.flags = getNetworkFlags()

NopCommand.examples = [
  'eth transaction:nop 3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e'
]

module.exports = NopCommand
