import * as fs from 'fs'
import Web3 from 'web3'

import { add0x } from './utils'

export function deploy(url: string, privateKey: string, bin: string) {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  privateKey = add0x(privateKey)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  const data = add0x(fs.readFileSync(bin).toString())

  const contract = new web3.eth.Contract([])

  const deploy = contract.deploy({ data })

  let dataToReturn: any = {}

  return deploy
    .estimateGas({
      from: address
    })
    .then(gas => {
      return deploy
        .send({
          from: address,
          gas,
        })
        .on('receipt', receipt => {
          dataToReturn.receipt = receipt
        })
    })
    .then(contract => {
      dataToReturn.address = contract.options.address
      return dataToReturn
    })
}
