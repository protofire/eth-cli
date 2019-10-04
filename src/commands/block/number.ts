import { NetworkCommand } from '../../base/network'

export default class GetCommand extends NetworkCommand {
  static description = `Get the block number of the chosen network`

  static flags = {
    ...NetworkCommand.flags,
  }

  static examples = ['eth block:number --rinkeby']

  async run() {
    const { flags } = this.parse(GetCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { getBlockNumber } = await import('../../helpers/getBlockNumber')
      const blockNumber = await getBlockNumber(networkUrl)

      this.log('' + blockNumber)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
