const Web3 = require('web3')
const web3 = new Web3()
const abi = web3.eth.abi

module.exports = function(functionSignature, txData) {
  const paramsMatch = functionSignature.match(/^[^(].*\((.*)\)$/)

  if (!paramsMatch || !paramsMatch[1]) {
    throw new Error('Invalid function signature')
  }

  const encodedFunctionSignature = abi.encodeFunctionSignature(functionSignature)

  // Normalize txData
  if (!/^0x/.test(txData)) {
    txData = '0x' + txData
  }

  const txDataRegex = new RegExp('^' + encodedFunctionSignature)

  if (!txDataRegex.test(txData)) {
    throw new Error('Function signature does not match the given transaction data')
  }

  const paramsStr = paramsMatch[1]
  const params = paramsStr.split(',')

  const args = abi.decodeParameters(params, txData.slice(10))

  const result = []
  for (let i = 0; i < args.__length__; i++) {
    result.push(args[i])
  }

  return result
}
