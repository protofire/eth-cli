import Web3 from 'web3'

import { getAddress } from './config'
import { evaluateMethodCallStructure, extractMethodsAndEventsFromABI } from './utils'

export async function contractCall(abi: any, methodCall: string, name: string, url: string) {
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
  const networkId = await web3.eth.net.getId()

  const address = getAddress(name, String(networkId))

  // `contract` is being used as part of the eval call
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const contract = new web3.eth.Contract(abi, address)
  // eslint-disable-next-line no-eval
  return eval(`contract.methods.${methodCall}.call()`)
}
