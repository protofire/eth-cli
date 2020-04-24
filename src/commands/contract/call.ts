import { NetworkCommand } from '../../base/network'
import { configService } from '../../helpers/config-service'

export default class CallCommand extends NetworkCommand {
  static description = `Call a method in the given contract and print the returned value.`

  static flags = {
    ...NetworkCommand.flags,
  }

  static args = [
    {
      name: 'contract',
      required: true,
      description: `The contract's ABI and address, in abi@address format.`,
    },
    {
      name: 'methodCall',
      required: true,
      description: `e.g.: 'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])'`,
    },
  ]

  static examples = [
    `eth contract:call --rinkeby erc20@0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea 'totalSupply()'`,
  ]

  async run() {
    const { args, flags } = this.parse(CallCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { contract, methodCall } = args
      const { contractCall } = await import('../../helpers/contractCall')
      const { getNetworkId } = await import('../../helpers/getNetworkId')
      const networkId = await getNetworkId(networkUrl)
      const { abi, address } = configService.loadContract(contract, networkId)
      const result = await contractCall(abi, methodCall, address, networkUrl)

      this.log(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
