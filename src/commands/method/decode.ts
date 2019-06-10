import { Command } from '@oclif/command'
import { cli } from 'cli-ux'

export default class DecodeCommand extends Command {
  static description = `Decode the arguments of the given transaction data for the given function signature.`

  static args = [
    {
      name: 'functionSignature',
      required: true,
      description: 'The function signature.',
    },
    {
      name: 'txData',
      required: true,
      description: 'The given transaction data.',
    },
  ]

  static examples = [
    `eth method:decode 'transfer(address,uint256)' '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'`,
  ]

  static aliases = ['de']

  async run() {
    const { args } = this.parse(DecodeCommand)

    try {
      const { functionSignature, txData } = args
      const { decodeTxData } = await import('../../helpers/decodeTxData')
      const result = decodeTxData(functionSignature, txData)

      cli.styledJSON(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
