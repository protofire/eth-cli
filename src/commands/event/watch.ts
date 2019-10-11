import { NetworkCommand } from '../../base/network'

export default class GetCommand extends NetworkCommand {
  static description = `Emit new events from the given type in the given contract`

  static flags = {
    ...NetworkCommand.flags,
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
      const { getEvents } = await import('../../helpers/getEvents')
      const { getBlockNumber } = await import('../../helpers/getBlockNumber')
      let fromBlock = await getBlockNumber(networkUrl)
      while (true) {
        const toBlock = await getBlockNumber(networkUrl)
        if (fromBlock <= toBlock) {
          const events = await getEvents(abi, event, address, networkUrl, {
            from: fromBlock,
            to: toBlock,
          })
          events.forEach(event => this.log(event))
          fromBlock = toBlock + 1
        }
        await new Promise((res: any) => setTimeout(res, 5000))
      }
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
