const { add0x } = require('./utils')
const Web3 = require('web3')

module.exports = function(data, contractAddress, privateKey, url) {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  privateKey = add0x(privateKey)
  contractAddress = add0x(contractAddress)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  return new Promise((resolve, reject) => {
    const tx = { from: address, data: data, to: contractAddress }
    web3.eth
      .estimateGas(tx)
      .then(gas => {
        tx.gas = gas
        web3.eth
          .sendTransaction(tx)
          .on('transactionHash', resolve)
          .on('error', reject)
      })
      .catch(reject)
  })
}
