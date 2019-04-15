import { BaseCommand } from '../../base'

export default class LoadCommand extends BaseCommand {
  static description = `Start a REPL that connects to a local eth node and loads the contract with the given <abi> in the given <address>.`

  static flags = {
    ...BaseCommand.flags,
  }

  static args = [
    {
      name: 'abi',
      required: true,
      description: 'The contract abi.',
    },
    {
      name: 'address',
      required: true,
      description: 'The contract address.',
    },
    {
      name: 'rest',
      required: false,
      description: 'Pairs of ABI address for loading extra contracts [[abi address]..].',
    },
  ]

  static examples = [
    'eth contract:load ./contracts/proxy.abi 0x601fd71f284B1933420A5DB0C43B10efC429A008',
  ]

  static aliases = ['ct:lc', 'ct:load']

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
