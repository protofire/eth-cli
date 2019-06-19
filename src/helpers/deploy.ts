import { cli } from 'cli-ux'
import * as fs from 'fs'
import Web3 from 'web3'
import { TransactionReceipt } from 'web3-core/types'
import { Contract } from 'web3-eth-contract/types'
import { Unit } from 'web3-utils/types'

import { add0x } from './utils'

interface DeployResult {
  receipt: TransactionReceipt
  address: string
}

export function deploy(url: string, privateKey: string, binPath: string): Promise<DeployResult> {
  const transactionConfirmationBlocks = 3
  const options = {
    transactionConfirmationBlocks,
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  privateKey = add0x(privateKey)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  const data = add0x(fs.readFileSync(binPath).toString())

  const Contract: any = web3.eth.Contract // ts hack: transactionConfirmationBlocks is not a valid option
  const contract = new Contract([], undefined, options)

  const deploy = contract.deploy({ data })
  let receipt: TransactionReceipt

  return deploy
    .estimateGas({
      from: address,
    })
    .then((gas: Unit) => {
      cli.log(`Estimated gas: ${gas}`)

      return deploy
        .send({
          from: address,
          gas,
        })
        .on('transactionHash', (tx: string) => {
          cli.log(`TX: ${tx}`)
        })
        .on(
          'confirmation',
          (confirmationNumber: number, transactionReceipt: TransactionReceipt) => {
            receipt = transactionReceipt
            cli.log(`Confirmation ${confirmationNumber} of ${transactionConfirmationBlocks}`)
          },
        )
        .then((contract: Contract) => ({ address: contract.options.address, receipt }))
    })
}
