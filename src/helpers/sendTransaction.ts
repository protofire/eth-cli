import Web3 from 'web3'
import { Tx } from 'web3/eth/types'

import { add0x } from './utils'

export async function sendTransaction(
  data: string,
  contractAddress: string,
  privateKey: string,
  url: string,
): Promise<string> {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  privateKey = add0x(privateKey)
  contractAddress = add0x(contractAddress)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  const tx: Tx = { from: address, data, to: contractAddress }

  const gas = await web3.eth.estimateGas(tx)

  return new Promise((resolve, reject) => {
    tx.gas = gas
    web3.eth.sendTransaction(tx, (err: Error, txHash: string) => {
      if (err) {
        return reject(err)
      }
      return resolve(txHash)
    })
  })
}
