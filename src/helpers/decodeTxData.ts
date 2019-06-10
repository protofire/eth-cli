import Web3 from 'web3'

import { add0x, isBN } from './utils'

export function decodeTxData(functionSignature: string, txData: string) {
  const paramsRegex = /^[^(].*\((.*)\)$/

  if (!paramsRegex.test(functionSignature)) {
    throw new Error('Invalid function signature')
  }

  const paramsMatch = functionSignature.match(paramsRegex)

  if (!paramsMatch || !paramsMatch[1]) {
    return []
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(''))
  const abi = web3.eth.abi
  const encodedFunctionSignature = abi.encodeFunctionSignature(functionSignature)

  txData = add0x(txData)

  const txDataRegex = new RegExp('^' + encodedFunctionSignature)

  if (!txDataRegex.test(txData)) {
    throw new Error('Function signature does not match the given transaction data')
  }

  const paramsStr = paramsMatch[1]
  const params = paramsStr.split(',')

  const args = abi.decodeParameters(params, add0x(txData.slice(10)))

  const result = []
  for (let i = 0; i < Object.keys(args).length; i++) {
    const value = isBN(args[i]) ? args[i].toString() : args[i]
    result.push(value)
  }

  return result
}
