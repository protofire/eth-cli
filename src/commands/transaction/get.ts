import { cli } from 'cli-ux'
import { Transaction } from 'web3/eth/types'
import { TransactionReceipt } from 'web3/types'

import { NetworkCommand } from '../../base/network'

export default class GetCommand extends NetworkCommand {
  static description = `Print the transaction object for the given transaction hash.`

  static flags = {
    ...NetworkCommand.flags,
  }

  static args = [
    {
      name: 'txHash',
      required: true,
      description: 'The transaction hash.',
    },
  ]

  static examples = [
    'eth transaction:get --mainnet 0xc83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a',
    'eth transaction:get --ropsten 0xc83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a',
    'eth transaction:get --url= http://localhost:8545 0xc83836f1b3acac94a31de8e24c913aceaa9ebc51c93cd374429590596091584a',
  ]

  static aliases = ['tx:get']

  async run() {
    const { args, flags } = this.parse(GetCommand)
    let networkUrl

    try {
      networkUrl = this.getNetworkUrl(flags)

      const { txHash } = args
      const { getTransaction, getReceipt } = await import('../../helpers/getTransactionObject')
      const promises: [Promise<Transaction>, Promise<TransactionReceipt>] = [
        getTransaction(txHash, networkUrl),
        getReceipt(txHash, networkUrl),
      ]
      const [transaction, receipt] = await Promise.all(promises)

      let output
      if (transaction) {
        output = {
          ...transaction,
          receipt,
        }
      } else {
        output = null
      }
      cli.styledJSON(output)
    } catch (e) {
      this.error(e.message, { exit: 1 })
    }
  }
}
