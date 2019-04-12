import * as fs from 'fs'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3-core/types'

import { add0x } from './utils'

interface DeployResult {
  receipt: TransactionReceipt
  address: string
}

export function deploy(url: string, privateKey: string, bin: string): Promise<DeployResult> {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  privateKey = add0x(privateKey)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  const data = add0x(fs.readFileSync(bin).toString())

  const contract = new web3.eth.Contract([])

  const deploy = contract.deploy({ data })

  return deploy
    .estimateGas({
      from: address,
    })
    .then(gas => {
      const contract = deploy.send({
        from: address,
        gas,
      })

      const receiptPromise = new Promise<TransactionReceipt>(resolve => {
        contract.on('receipt', receipt => resolve(receipt))
      })

      return Promise.all([contract, receiptPromise])
    })
    .then(([contract, receipt]) => {
      return { address: contract.options.address, receipt }
    })
}
