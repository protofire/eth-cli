const Web3 = require('web3')

module.exports = function(transactionHash) {
  // Connect web3
  const web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545')
  )

  return web3.eth.getTransaction(transactionHash)
}
