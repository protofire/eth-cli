import Web3 from 'web3'

import { getPrivateKey } from './config'

export async function generateNop(url: string, privateKeyOrKnownAddress: string): Promise<string> {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  const networkId = await web3.eth.net.getId()
  const privateKey = getPrivateKey(privateKeyOrKnownAddress, String(networkId))

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
