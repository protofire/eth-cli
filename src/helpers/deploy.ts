import * as fs from 'fs'
import Web3 from 'web3'

import { getPrivateKey } from './config'
import { add0x } from './utils'

export async function deploy(
  url: string,
  privateKeyOrKnownAddress: string,
  abi: any[],
  binPath: string,
  constructorArguments: any[],
): Promise<string> {
  const web3 = new Web3(url)
  const networkId = await web3.eth.net.getId()
  const privateKey = getPrivateKey(privateKeyOrKnownAddress, String(networkId))

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  const data = add0x(fs.readFileSync(binPath).toString())

  const Contract: any = web3.eth.Contract // ts hack: transactionConfirmationBlocks is not a valid option
  const contract = new Contract(abi)

  const deploy = contract.deploy({ data, arguments: constructorArguments })

  const gas = await deploy.estimateGas({
    from: address,
  })

  return new Promise((resolve, reject) => {
    deploy.send(
      {
        from: address,
        gas,
      },
      (err: Error, txHash: string) => {
        if (err) {
          return reject(err)
        }
        return resolve(txHash)
      },
    )
  })
}
