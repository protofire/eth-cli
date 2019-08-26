import Web3 from 'web3'

import { getPrivateKey } from './config'

export function generateNop(url: string, privateKeyOrKnownAddress: string): Promise<string> {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  const privateKey = getPrivateKey(privateKeyOrKnownAddress)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  return new Promise((resolve, reject) => {
    web3.eth
      .sendTransaction({
        from: address,
        to: address,
        gas: 21000,
      })
      .once('transactionHash', transactionHash => {
        resolve(transactionHash)
      })
      .once('error', e => {
        reject(e)
      })
  })
}
