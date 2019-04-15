import { BaseCommand } from '../base'

export default class ReplCommand extends BaseCommand {
  static description = `Start a REPL that connects to a local eth node and exposes the 'web3' and 'eth' objects.`

  static flags = {
    ...BaseCommand.flags,
  }

  static examples = [
    'eth repl --ropsten',
    'eth repl --mainnet',
    'eth repl --url=http://localhost:8545',
  ]

  async run() {
    const { flags } = this.parse(ReplCommand)
    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)
      const { startRepl } = await import('../helpers/startRepl')
      startRepl(networkUrl)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
