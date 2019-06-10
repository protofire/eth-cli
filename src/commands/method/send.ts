import { cli } from 'cli-ux'

import { BaseCommand } from '../../base'
import { privateKeyFlag } from '../../flags'

export default class SendCommand extends BaseCommand {
  static description = `Executes <methodCall> for the contract in <address> given <abi> using the given private key.`

  static flags = {
    ...BaseCommand.flags,
    pk: { ...privateKeyFlag, required: true },
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
    `eth method:send erc20 'transfer("0xb2E4a264A982039f8E503ea3C83af5537f583069", "0xDa480B4852ca3aDE4acF3eeCA6901952EdbAe912")' 0x15503FBAb2fa57535092ab9c24740142Ab6cabd3 0x6db0bdfc7800dcf87b5a88b3363997360395d36ef51db10c3458d51d8aefd37e`,
  ]

  static aliases = ['m:s']

  async run() {
    const { args, flags } = this.parse(SendCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { abi, methodCall, address } = args
      const { pk } = flags
      const { encode } = await import('../../helpers/encode')
      const { sendTransaction } = await import('../../helpers/sendTransaction')
      const abiByteCode = encode(abi, methodCall, networkUrl)
      const result = await sendTransaction(abiByteCode, address, pk!, networkUrl)

      cli.styledJSON(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
