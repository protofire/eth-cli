import { BaseCommand } from '../../base'
import { getNetworkFlags } from '../../helpers/networks'

export default class EncodeCommand extends BaseCommand {
  async run() {
    const { args, flags } = this.parse(EncodeCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { abi, methodCall } = args
      const { encode } = await import('../../helpers/encode')
      const result = encode(abi, methodCall, networkUrl)

      this.log(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}

EncodeCommand.aliases = ['m:e']

EncodeCommand.description = `Encodes the ABI for the method <methodCall> and returns the ABI byte code.`

EncodeCommand.args = [
  {
    name: 'abi',
    required: true,
    description: 'The abi file.',
  },
  {
    name: 'methodCall',
    required: true,
    description: `e.g.: 'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])'`,
  },
]

EncodeCommand.flags = getNetworkFlags()

EncodeCommand.examples = [
  `eth method:encode --sokol ./test/files/contracts/Proxy.abi 'updateAppInstance()'`,
]
