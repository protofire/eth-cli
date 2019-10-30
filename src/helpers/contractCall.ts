import Web3 from 'web3'

import { getAddress, getPrivateKey } from './config'
import { evaluateMethodCallStructure, extractMethodsAndEventsFromABI } from './utils'

export async function contractCall(
  abi: any,
  methodCall: string,
  name: string,
  url: string,
  privateKeyOrKnownAddress?: string,
) {
  const { methodValid, methodName } = evaluateMethodCallStructure(methodCall)

  if (!methodValid) {
    throw new Error('[contractCall] methodCall invalid structure')
  }

  const matchingMethods = extractMethodsAndEventsFromABI(abi).filter(x => x.name === methodName)

  if (matchingMethods.length > 1) {
    throw new Error('[contractCall] function overloading is not supported in the current version')
  }

  if (!matchingMethods.length) {
    throw new Error('[contractCall] method specified does not exist in the ABI file provided')
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  let address: string | null = null
  if (privateKeyOrKnownAddress) {
    const networkId = await web3.eth.net.getId()
    const privateKey = getPrivateKey(privateKeyOrKnownAddress, String(networkId))
    const account = web3.eth.accounts.wallet.add(privateKey)
    address = account.address
  }
  const networkId = await web3.eth.net.getId()

  const contractAddress = getAddress(name, String(networkId))

  // `contract` is being used as part of the eval call
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const contract = new web3.eth.Contract(abi, contractAddress)
  // eslint-disable-next-line no-eval
  const methodObject = eval(`contract.methods.${methodCall}`)

  if (address) {
    const gas = await methodObject.estimateGas({ from: address })
    return new Promise(resolve => {
      methodObject.send({ from: address, gas })
      .once('transactionHash', resolve)
    })
  } else {
    return methodObject.call()
  }
}
