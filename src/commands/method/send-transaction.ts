import { cli } from 'cli-ux'

import { BaseCommand } from '../../base'
import { privateKeyFlag } from '../../flags'

export default class SendTransactionCommand extends BaseCommand {
  static description = `Sends the transaction for the contract in <address> with <encodedABI> using the given private key.`

  static flags = {
    ...BaseCommand.flags,
    pk: { ...privateKeyFlag, required: true },
  }

  static args = [
    {
      name: 'encodedABI',
      required: true,
      description: 'The encoded ABI.',
    },
    {
      name: 'address',
      required: true,
      description: `The contract's address.`,
    },
  ]

  static examples = [
    'eth method:send-transaction --pk 0x6db0bdfc7800dcf87b5a88b3363997360395d36ef51db10c3458d51d8aefd37e 0xa9059cbb000000000000000000000000b2e4a264a982039f8e503ea3c83af5537f583069000000000000000000000000da480b4852ca3ade4acf3eeca6901952edbae912 0x15503FBAb2fa57535092ab9c24740142Ab6cabd3',
  ]

  static aliases = ['m:st']

  async run() {
    const { args, flags } = this.parse(SendTransactionCommand)

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
