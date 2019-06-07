import { cli } from 'cli-ux'

import { BaseCommand } from '../../base'

export default class SendTransactionCommand extends BaseCommand {
  static description = `Sends the transaction for the contract in <address> with <encodedABI> using private key <pk>.`

  static flags = {
    ...BaseCommand.flags,
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
    {
      name: 'pk',
      required: true,
      description: 'The private key.',
    },
  ]

  static examples = ['eth method:send-transaction']

  static aliases = ['m:st']

  async run() {
    const { args, flags } = this.parse(SendTransactionCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { encodedABI, address, pk } = args
      const { sendTransaction } = await import('../../helpers/sendTransaction')
      const result = await sendTransaction(encodedABI, address, pk, networkUrl)

      cli.styledJSON(result)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
