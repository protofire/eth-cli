import { NetworkCommand } from '../../base/network'

export default class EncodeCommand extends NetworkCommand {
  static description = `Encode the ABI for the method <methodCall> and print the ABI byte code.`

  static flags = {
    ...NetworkCommand.flags,
  }

  static args = [
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

  static examples = [
    `eth method:encode --sokol ./test/files/contracts/Proxy.abi 'updateAppInstance()'`,
  ]

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
