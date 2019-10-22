import { flags } from '@oclif/command'
import cli from 'cli-ux'

import { NetworkCommand } from '../../base/network'
import { getContract } from '../../helpers/utils'

export default class GetCommand extends NetworkCommand {
  static description = `Get the events in the given block range.`

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
    json: flags.boolean({
      description: 'Print events in JSON format',
    }),
  }

  static args = [
    {
      name: 'contract',
      required: true,
      description: `The contract's ABI and address, in abi@address format.`,
    },
    {
      name: 'event',
      required: true,
      description: `e.g.: 'MyEvent'`,
    },
  ]

  static examples = [
    'eth event:get --mainnet erc20@0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359 Transfer --from 1',
    'eth event:get --mainnet erc20@0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359 Transfer --from 1 --json',
  ]

  async run() {
    const { args, flags } = this.parse(GetCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { contract: abiAtAddress, event } = args
      const { from, to, json } = flags
      const { getEvents, parseEvent, processEvent } = await import('../../helpers/getEvents')

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

      const { getNetworkId } = await import('../../helpers/getNetworkId')
      const networkId = await getNetworkId(networkUrl)
      const { abi, address } = getContract(abiAtAddress, String(networkId))

      const { events, eventAbi } = await getEvents(abi, event, address, networkUrl, {
        from: fromBlock,
        to: toBlock,
      })

      if (json) {
        events.forEach(event => {
          cli.styledJSON(processEvent(event, eventAbi))
        })
      } else {
        events.forEach(event => this.log(parseEvent(event, eventAbi)))
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
