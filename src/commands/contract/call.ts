import { cli } from 'cli-ux'

import { NetworkCommand } from '../../base/network'

export default class CallCommand extends NetworkCommand {
  static description = `Calls method <methodCall> in contract with abi <abi> at address <address>`

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
      name: 'methodCall',
      required: true,
      description: `e.g.: 'myMethod(arg1,arg2,["a","b",3,["d","0x123..."]])'`,
    },
    {
      name: 'address',
      required: true,
      description: `The contract's  address.`,
    },
  ]

  static examples = [
    `eth contract:call --rinkeby erc20 'totalSupply()' 0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea`,
  ]

  async run() {
    const { args, flags } = this.parse(CallCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { abi, methodCall, address } = args
      const { contractCall } = await import('../../helpers/contractCall')
      const result = await contractCall(abi, methodCall, address, networkUrl)

      cli.styledJSON(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
