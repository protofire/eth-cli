import ora from 'ora'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3/types'

import { sleep } from './utils'

export const awaitTransactionMined = async (
  networkUrl: string,
  txHash: string,
  confirmationBlocks: number,
): Promise<TransactionReceipt> => {
  const web3 = new Web3(new Web3.providers.HttpProvider(networkUrl))

  const spinner = ora('Waiting for transaction to be mined').start()

  // wait until mined
  let receipt: TransactionReceipt | null = null
  while (true) {
    receipt = await web3.eth.getTransactionReceipt(txHash)

    if (receipt) {
      break
    }

    await sleep(1000)
  }

  // wait until the specified number of blocks has passed
  while (true) {
    const blockNumber = await web3.eth.getBlockNumber()

    const blocksSinceMined = blockNumber - receipt.blockNumber

    if (blocksSinceMined >= 0) {
      spinner.text = `${blocksSinceMined}/${confirmationBlocks} confirmations`

      if (blocksSinceMined >= confirmationBlocks) {
        break
      }
    }

    await sleep(1000)
  }

  spinner.stop()

  return receipt
}
