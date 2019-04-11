import { BaseCommand } from '../../base'
import { getNetworkFlags } from '../../helpers/networks'

export default class LoadCommand extends BaseCommand {
  async run() {
    const { args, flags } = this.parse(LoadCommand)
    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { abi, address, rest = [] } = args

      if (rest.length % 2 !== 0) {
        throw new Error('eth load-contract: You must specify an address for each contract')
      }

      const { loadContract } = await import('../../helpers/loadContract')
      loadContract(abi, address, rest, networkUrl)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

LoadCommand.aliases = ['ct:lc', 'ct:load']

LoadCommand.description = `Start a REPL that connects to a local eth node and loads the contract with the given <abi> in the given <address>.`

LoadCommand.args = [
  {
    name: 'abi',
    required: true,
    description: 'The contract abi.'
  },
  {
    name: 'address',
    required: true,
    description: 'The contract address.'
  },
  {
    name: 'rest',
    required: false,
    description: 'Pairs of ABI address for loading extra contracts [[abi address]..].'
  }
]

LoadCommand.flags = getNetworkFlags()

LoadCommand.examples = [
  'eth contract:load ./contracts/proxy.abi 0x601fd71f284B1933420A5DB0C43B10efC429A008'
]
