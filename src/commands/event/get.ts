import { flags } from '@oclif/command'

import { NetworkCommand } from '../../base/network'

export default class GetCommand extends NetworkCommand {
  static description = `Get the events in the given block range`

  static flags = {
    ...NetworkCommand.flags,
    from: flags.string({
      char: 'f',
      required: false,
      default: 'latest',
      description:
        'Start of the block number. Can be a positive number, a negative number, or "latest" (default). A negative number is interpreted as substracted from the current block number.',
    }),
    to: flags.string({
      char: 't',
      required: false,
      default: 'latest',
      description:
        'End of the block range. Can be a positive number, a negative number, or "latest" (default). A negative number is interpreted as substracted from the current block number.',
    }),
  }

  static args = [
    {
      name: 'abi',
      required: true,
      description: `The contract's ABI.`,
    },
    {
      name: 'event',
      required: true,
      description: `e.g.: 'MyEvent'`,
    },
    {
      name: 'address',
      required: true,
      description: `The contract's  address.`,
    },
  ]

  static examples = [
    'eth event:get --mainnet --from 1 erc20 Transfer 0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
  ]

  async run() {
    const { args, flags } = this.parse(GetCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { abi, event, address } = args
      const { from, to } = flags
      const { getEvents } = await import('../../helpers/getEvents')

      const { getBlockNumber } = await import('../../helpers/getBlockNumber')
      const blockNumber = await getBlockNumber(networkUrl)

      let fromBlock = from
      if (fromBlock !== 'latest' && +fromBlock < 0) {
        fromBlock = String(blockNumber + Number(from))
      }

      let toBlock = to
      if (toBlock !== 'latest' && +toBlock < 0) {
        toBlock = String(blockNumber + Number(to))
      }

      const events = await getEvents(abi, event, address, networkUrl, {
        from: fromBlock,
        to: toBlock,
      })

      events.forEach(event => this.log(event))
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
