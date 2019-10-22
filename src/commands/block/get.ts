import { cli } from 'cli-ux'

import { NetworkCommand } from '../../base/network'

export default class GetCommand extends NetworkCommand {
  static description = 'Get the block object for a given block number.'

  static flags = {
    ...NetworkCommand.flags,
  }

  static args = [
    {
      name: 'number',
      required: true,
      description: 'The number of the block',
    },
  ]

  static examples = ['eth block:get --mainnet 12345']

  async run() {
    const { args, flags } = this.parse(GetCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { number: blockNumber } = args
      const { getBlock } = await import('../../helpers/getBlockObject')
      const block = await getBlock(+blockNumber, networkUrl)
      cli.styledJSON(block)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
