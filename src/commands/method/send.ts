import { cli } from 'cli-ux'

import { BaseCommand } from '../../base'
import { getNetworkFlags } from '../../helpers/networks'

export default class SendCommand extends BaseCommand {
  async run() {
    const { args, flags } = this.parse(SendCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { abi, methodCall, address, pk } = args
      const { encode } = await import('../../helpers/encode')
      const { sendTransaction } = await import('../../helpers/sendTransaction')
      const abiByteCode = encode(abi, methodCall, networkUrl)
      const result = await sendTransaction(abiByteCode, address, pk, networkUrl)

      cli.styledJSON(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

SendCommand.aliases = ['m:s']

SendCommand.description = `Executes <methodCall> for the contract in <address> given <abi> using private key <pk>.`

SendCommand.args = [
  {
    name: 'abi',
    required: true,
    description: `The contract's ABI.`
  },
  {
    name: 'methodCall',
    required: true,
    description: `e.g.: 'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])'`
  },
  {
    name: 'address',
    required: true,
    description: `The contract's  address.`
  },
  {
    name: 'pk',
    required: true,
    description: 'The private key.'
  }
]

SendCommand.flags = getNetworkFlags()

SendCommand.examples = ['eth method:send']
