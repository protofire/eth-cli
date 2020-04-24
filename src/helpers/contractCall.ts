import Web3 from 'web3'

import { ConfigService, configService } from './config-service'
import { evaluateMethodCallStructure } from './utils'

export async function contractCall(
  abi: any,
  methodCall: string,
  name: string,
  url: string,
  privateKeyOrKnownAddress?: string,
  extraParams?: { value: number },
) {
  const { methodValid, methodName } = evaluateMethodCallStructure(methodCall)

  if (!methodValid) {
    throw new Error('[contractCall] methodCall invalid structure')
  }

  const matchingMethods = ConfigService.extractMethodsAndEventsFromABI(abi).filter(
    x => x.name === methodName,
  )

  if (matchingMethods.length > 1) {
    throw new Error('[contractCall] function overloading is not supported in the current version')
  }

  if (!matchingMethods.length) {
    throw new Error('[contractCall] method specified does not exist in the ABI file provided')
  }

  const web3 = new Web3(url)
  let address: string | null = null
  if (privateKeyOrKnownAddress) {
    const networkId = await web3.eth.net.getId()
    const privateKey = configService.getPrivateKey(privateKeyOrKnownAddress, networkId)
    const account = web3.eth.accounts.wallet.add(privateKey)
    address = account.address
  }
  const networkId = await web3.eth.net.getId()

  const contractAddress = configService.getAddress(name, networkId)

  // `contract` is being used as part of the eval call
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const contract = new web3.eth.Contract(abi, contractAddress)
  // eslint-disable-next-line no-eval
  const methodObject = eval(`contract.methods.${methodCall}`)

  if (address) {
    let txParams: object = { from: address }
    if (extraParams) {
      txParams = { ...txParams, ...extraParams }
    }
    const gas = await methodObject.estimateGas(txParams)
    return new Promise(resolve => {
      methodObject.send({ ...txParams, gas }).once('transactionHash', resolve)
    })
  } else {
    return methodObject.call()
  }
}
