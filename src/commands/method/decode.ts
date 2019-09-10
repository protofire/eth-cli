import { Command } from '@oclif/command'
import { cli } from 'cli-ux'

import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class DecodeCommand extends Command {
  static description = `Decode the arguments of the given transaction data for the given function signature.`

  static args = [
    {
      name: 'functionSignature',
      required: false,
      description: 'The function signature.',
    },
    {
      name: 'txData',
      required: false,
      description: 'The given transaction data.',
    },
  ]

  static examples = [
    `eth method:decode 'transfer(address,uint256)' '0xa9059cbb000000000000000000000000697dB915674bAc602F4d6fAfA31c0e45f386416E00000000000000000000000000000000000000000000000000000004ff043b9e'`,
  ]

  static aliases = ['de']

  async run() {
    const { args, flags } = this.parse(DecodeCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

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
