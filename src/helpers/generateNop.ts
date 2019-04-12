import Web3 from 'web3'

import { add0x } from './utils'

export function generateNop(url: string, privateKey: string) {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  privateKey = add0x(privateKey)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  return new Promise(resolve => {
    web3.eth
      .sendTransaction({
        from: address,
        to: address,
        gas: 21000
      })
      .once('transactionHash', transactionHash => resolve(transactionHash))
  })
}
