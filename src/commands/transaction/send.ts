import { flags } from '@oclif/command'
import { cli } from 'cli-ux'

import { NetworkCommand } from '../../base/network'
import { confirmationBlocksFlag, privateKeyFlag } from '../../flags'
import { awaitTransactionMined } from '../../helpers/transactions'

export default class SendCommand extends NetworkCommand {
  static description = `Send a raw transaction`

  static flags = {
    ...NetworkCommand.flags,
    pk: { ...privateKeyFlag, required: true },
    'confirmation-blocks': confirmationBlocksFlag,
    to: flags.string({
      description: 'The recipient address of the transaction',
      required: true,
    }),
    gas: flags.string({
      description: 'The gas limit of the transaction. Will be estimated if not specified.',
    }),
    gasPrice: flags.string({
      description: 'The gas price of the transaction, in wei. Defaults to 1 gwei.',
    }),
    value: flags.string({
      description: 'The amount of eth to send with the transaciton, in wei.',
    }),
    data: flags.string({
      description: 'The raw data field of the transaction. Consider using contract:send instead of this.'
    })
  }

  static examples = [
    'eth transaction:send --pk 3daa79a26454a5528a3523f9e6345efdbd636e63f8c24a835204e6ccb5c88f9e --to 0x828DaF877f46fdFB5F1239cd9cB8f0D6E1adfb80 --value 1000000000000000000',
  ]

  static aliases = ['tx:send']

  async run() {
    const { flags } = this.parse(SendCommand)

    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { 'confirmation-blocks': confirmationBlocks, pk, to, gas, gasPrice = '1000000000', value = '0', data = '' } = flags

      if (!pk) {
        throw new Error('Specify the private key using --pk')
      }

      const { sendRawTransaction } = await import('../../helpers/sendRawTransaction')
      const tx = await sendRawTransaction(networkUrl, pk, to, {
        gas, gasPrice, value, data
      })

      await awaitTransactionMined(networkUrl, tx, confirmationBlocks)

      cli.styledJSON(tx)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
