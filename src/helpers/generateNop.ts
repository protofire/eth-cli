import Web3 from 'web3'

import { configService } from './config-service'

export async function generateNop(url: string, privateKeyOrKnownAddress: string): Promise<string> {
  const web3 = new Web3(url)
  const networkId = await web3.eth.net.getId()
  const privateKey = configService.getPrivateKey(privateKeyOrKnownAddress, networkId)

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
