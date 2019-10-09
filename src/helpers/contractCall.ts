import Web3 from 'web3'

import { getAddress } from './config'
import { evaluateMethodCallStructure, extractMethodsAndEventsFromABI, loadABI } from './utils'

export async function contractCall(abiPath: string, methodCall: string, name: string, url: string) {
  const { methodValid, methodName } = evaluateMethodCallStructure(methodCall)

  if (!methodValid) {
    throw new Error('[encode] methodCall invalid structure')
  }

  const abi = loadABI(abiPath)
  const matchingMethods = extractMethodsAndEventsFromABI(abi).filter(x => x.name === methodName)

  if (matchingMethods.length > 1) {
    throw new Error('[encode] function overloading is not supported in the current version')
  }

  if (!matchingMethods.length) {
    throw new Error('[encode] method specified does not exist in the ABI file provided')
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  const networkId = await web3.eth.net.getId()

  const address = getAddress(name, String(networkId))

  // `contract` is being used as part of the eval call
  // tslint:disable-next-line:no-unused
  const contract = new web3.eth.Contract(abi, address)
  // tslint:disable-next-line:no-eval
  return eval(`contract.methods.${methodCall}.call()`)
}
