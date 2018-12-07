const Base = require('../base')
const startRepl = require('../helpers/startRepl')
const { getNetworkFlags } = require('../helpers/networks')

class ReplCommand extends Base {
  async run() {
    const { flags } = this.parse(ReplCommand)
    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      startRepl(networkUrl)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

ReplCommand.description = `Start a REPL that connects to a local eth node and exposes the 'web3' and 'eth' objects.`

ReplCommand.flags = getNetworkFlags()

ReplCommand.examples = [
  'eth repl --ropsten',
  'eth repl --mainnet',
  'eth repl --url=http://localhost:8545'
]

module.exports = ReplCommand
