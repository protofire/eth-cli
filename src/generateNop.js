const Web3 = require('web3')
const { add0x } = require('./utils')

module.exports = function(url, privateKey) {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  privateKey = add0x(privateKey)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  return web3.eth
    .sendTransaction({
      from: address,
      to: address,
      gas: 21000
    })
    .then(result => result.transactionHash)
}
