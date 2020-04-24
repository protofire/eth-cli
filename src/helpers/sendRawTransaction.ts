import Web3 from 'web3'
import { Tx } from 'web3/eth/types'

import { configService } from './config-service'

interface ExtraParams {
  gas?: string
  gasPrice: string
  value: string
  data: string
}

export async function sendRawTransaction(
  url: string,
  privateKeyOrKnownAddress: string,
  to: string,
  { gas, ...extraParams }: ExtraParams,
): Promise<string> {
  const web3 = new Web3(url)
  const networkId = await web3.eth.net.getId()

  const privateKey = configService.getPrivateKey(privateKeyOrKnownAddress, networkId)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  const recipient = configService.getAddress(to, networkId)
  const tx: Tx = { from: address, to: recipient, ...extraParams }

  if (gas) {
    tx.gas = gas
  } else {
    const estimatedGas = await web3.eth.estimateGas(tx)
    tx.gas = estimatedGas
  }

  return new Promise((resolve, reject) => {
    web3.eth.sendTransaction(tx, (err: Error, txHash: string) => {
      if (err) {
        return reject(err)
      }
      return resolve(txHash)
    })
  })
}
