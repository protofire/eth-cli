import { flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { NetworkCommand } from '../../base/network'
import { confirmationBlocksFlag, privateKeyFlag } from '../../flags'
import { awaitTransactionMined } from '../../helpers/transactions'
import { configService } from '../../helpers/config-service'

export default class SendCommand extends NetworkCommand {
  static description = `Send a transaction calling a method in the given contract.`

  static flags = {
    ...NetworkCommand.flags,
    pk: { ...privateKeyFlag, required: true },
    'confirmation-blocks': confirmationBlocksFlag,
    value: flags.integer({
      description: 'Amount of ether (in wei) to be sent with the transaction',
      default: 0,
    }),
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
    `eth contract:send --rinkeby erc20@0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea 'transfer("0x828DaF877f46fdFB5F1239cd9cB8f0D6E1adfb80", 1000000000)'`,
  ]

  async run() {
    const { args, flags } = this.parse(SendCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { contract: abiAtAddress, methodCall } = args
      const { 'confirmation-blocks': confirmationBlocks, pk, value } = flags
      const { contractCall } = await import('../../helpers/contractCall')
      const { getNetworkId } = await import('../../helpers/getNetworkId')
      const networkId = await getNetworkId(networkUrl)
      const { abi, address } = configService.loadContract(abiAtAddress, networkId)
      const tx = await contractCall(abi, methodCall, address, networkUrl, pk, { value })

      await awaitTransactionMined(networkUrl, tx, confirmationBlocks)

      cli.styledJSON(tx)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
