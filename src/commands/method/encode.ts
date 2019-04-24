import { BaseCommand } from '../../base'

export default class EncodeCommand extends BaseCommand {
  static description = `Encodes the ABI for the method <methodCall> and returns the ABI byte code.`

  static flags = {
    ...BaseCommand.flags,
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

  static aliases = ['m:e']

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
