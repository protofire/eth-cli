import Web3 from 'web3'

import { evaluateMethodCallStructure } from './utils'
import { ConfigService, configService } from './config-service'

export function encode(abiPath: string, methodCall: string, url: string) {
  if (!methodCall) {
    throw new Error('[encode] methodCall required')
  }

  const { methodValid, methodName } = evaluateMethodCallStructure(methodCall)

  if (!methodValid) {
    throw new Error('[encode] methodCall invalid structure')
  }

  const { abi } = configService.loadABI(abiPath)
  const matchingMethods = ConfigService.extractMethodsAndEventsFromABI(abi).filter(
    (x: any) => x.name === methodName,
  )

  if (matchingMethods.length > 1) {
    throw new Error('[encode] function overloading is not supported in the current version')
  }

  if (!matchingMethods.length) {
    throw new Error('[encode] method specified does not exist in the ABI file provided')
  }

  const web3 = new Web3(url)
  // `contract` is being used as part of the eval call
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const contract = new web3.eth.Contract(abi)
  // eslint-disable-next-line no-eval
  return eval(`contract.methods.${methodCall}.encodeABI()`)
}
