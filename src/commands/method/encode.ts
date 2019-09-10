import { NetworkCommand } from '../../base/network'
import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class EncodeCommand extends NetworkCommand {
  static description = `Encodes the ABI for the method <methodCall> and returns the ABI byte code.`

  static flags = {
    ...NetworkCommand.flags,
  }

  static args = [
    {
      name: 'abi',
      required: false,
      description: 'The abi file.',
    },
    {
      name: 'methodCall',
      required: false,
      description: `e.g.: 'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])'`,
    },
  ]

  static examples = [
    `eth method:encode --sokol ./test/files/contracts/Proxy.abi 'updateAppInstance()'`,
  ]

  static aliases = ['m:e']

  async run() {
    const { args, flags } = this.parse(EncodeCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

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
