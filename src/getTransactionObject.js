const Web3 = require('web3')

module.exports = function(transactionHash, url) {
  if (!url) {
    throw new Error('[getTransactionObject] URL required')
  }
  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  return web3.eth.getTransaction(transactionHash)
}
