import { flags } from '@oclif/command'
import cli from 'cli-ux'

import { NetworkCommand } from '../../base/network'
import { getContract } from '../../helpers/utils'

export default class GetCommand extends NetworkCommand {
  static description = `Emit new events from the given type in the given contract`

  static flags = {
    ...NetworkCommand.flags,
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
    'eth event:get --mainnet --from 1 erc20 Transfer 0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
  ]

  async run() {
    const { args, flags } = this.parse(GetCommand)
    const { json } = flags

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { contract: abiAtAddress, event } = args
      const { getEvents, parseEvent, processEvent } = await import('../../helpers/getEvents')
      const { getBlockNumber } = await import('../../helpers/getBlockNumber')
      let fromBlock = await getBlockNumber(networkUrl)

      const { getNetworkId } = await import('../../helpers/getNetworkId')
      const networkId = await getNetworkId(networkUrl)
      const { abi, address } = getContract(abiAtAddress, String(networkId))

      while (true) {
        const toBlock = await getBlockNumber(networkUrl)
        if (fromBlock <= toBlock) {
          const { events, eventAbi } = await getEvents(abi, event, address, networkUrl, {
            from: fromBlock,
            to: toBlock,
          })

          if (json) {
            events.forEach(event => cli.styledJSON(processEvent(event, eventAbi)))
          } else {
            events.forEach(event => this.log(parseEvent(event, eventAbi)))
          }

          fromBlock = toBlock + 1
        }
        await new Promise((res: any) => setTimeout(res, 5000))
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
