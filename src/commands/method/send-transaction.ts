import chalk from 'chalk'
import { cli } from 'cli-ux'

import { NetworkCommand } from '../../base/network'
import { privateKeyFlag } from '../../flags'
import { isEmptyCommand } from '../../helpers/checkCommandInputs'

export default class SendTransactionCommand extends NetworkCommand {
  static description = `Sends the transaction for the contract in <address> with <encodedABI> using the given private key.`

  static flags = {
    ...NetworkCommand.flags,
    pk: { ...privateKeyFlag, required: false },
  }

  static args = [
    {
      name: 'encodedABI',
      required: false,
      description: 'The encoded ABI.',
    },
    {
      name: 'address',
      required: false,
      description: `The contract's address.`,
    },
  ]

  static examples = [
    'eth method:send-transaction --pk 0x6db0bdfc7800dcf87b5a88b3363997360395d36ef51db10c3458d51d8aefd37e 0xa9059cbb000000000000000000000000b2e4a264a982039f8e503ea3c83af5537f583069000000000000000000000000da480b4852ca3ade4acf3eeca6901952edbae912 0x15503FBAb2fa57535092ab9c24740142Ab6cabd3',
  ]

  static aliases = ['m:st']

  async run() {
    const { args, flags } = this.parse(SendTransactionCommand)

    if (isEmptyCommand(flags, args)) {
      this._help()
      this.exit(1)
    }

    console.warn(
      chalk.yellow(
        `Warning: the 'method:send-transaction' command is deprecated and will be removed in the future. Use 'method:send' instead.`,
      ),
    )

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { encodedABI, address } = args
      const { pk } = flags
      const { sendTransaction } = await import('../../helpers/sendTransaction')
      const result = await sendTransaction(encodedABI, address, pk!, networkUrl)

      cli.styledJSON(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
