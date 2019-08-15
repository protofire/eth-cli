import Web3 from 'web3'
import { Tx } from 'web3/eth/types'

import { add0x } from './utils'

export function sendTransaction(
  data: string,
  contractAddress: string,
  privateKey: string,
  url: string,
) {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  privateKey = add0x(privateKey)
  contractAddress = add0x(contractAddress)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  return new Promise((resolve, reject) => {
    const tx: Tx = { from: address, data, to: contractAddress }
    web3.eth
      .estimateGas(tx)
      .then(gas => {
        tx.gas = gas
        web3.eth
          .sendTransaction(tx)
          .on('transactionHash', resolve)
          .on('error', reject)
      })
      .catch(reject)
  })
}
