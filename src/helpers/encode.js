const { extractMethodObjectsFromABI, loadABI, evaluateMethodCallStructure } = require('./utils')
const Web3 = require('web3')

module.exports = function(abiPath, methodCall, url) {
  if (!methodCall) {
    throw new Error('[encode] methodCall required')
  }

  const { methodValid, methodName } = evaluateMethodCallStructure(methodCall)

  if (!methodValid) {
    throw new Error('[encode] methodCall invalid structure')
  }

  const abi = loadABI(abiPath)
  const matchingMethods = extractMethodObjectsFromABI(abi).filter(x => x.name === methodName)

  if (matchingMethods.length > 1) {
    throw new Error('[encode] function overloading is not supported in the current version')
  }

  if (!matchingMethods.length) {
    throw new Error('[encode] method specified does not exist in the ABI file provided')
  }

  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  // `contract` is being used as part of the eval call
  // eslint-disable-next-line no-unused-vars
  const contract = new web3.eth.Contract(abi)
  return eval(`contract.methods.${methodCall}.encodeABI()`)
}
