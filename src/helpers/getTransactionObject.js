const Web3 = require('web3')

const getTransaction = function(transactionHash, url) {
  if (!transactionHash) {
    throw new Error('[getTransactionObject] txHash required')
  }

  if (!url) {
    throw new Error('[getTransactionObject] URL required')
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  return web3.eth.getTransaction(transactionHash)
}

const getReceipt = function(transactionHash, url) {
  if (!transactionHash) {
    throw new Error('[getTransactionObject] txHash required')
  }

  if (!url) {
    throw new Error('[getTransactionObject] URL required')
  }
  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  return web3.eth.getTransactionReceipt(transactionHash)
}

module.exports = {
  getTransaction,
  getReceipt
}
