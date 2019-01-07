const fs = require('fs')
const Web3 = require('web3')
const { add0x } = require('./utils')

module.exports = function(url, privateKey, bin) {
  const web3 = new Web3(new Web3.providers.HttpProvider(url))
  privateKey = add0x(privateKey)

  const { address } = web3.eth.accounts.wallet.add(privateKey)

  const data = add0x(fs.readFileSync(bin).toString())

  const contract = new web3.eth.Contract([])

  const deploy = contract.deploy({ data })

  let dataToReturn = {}

  return deploy
    .estimateGas({
      from: address
    })
    .then(gas => {
      return deploy
        .send({
          from: address,
          gas: gas
        })
        .on('receipt', receipt => {
          dataToReturn.receipt = receipt
        })
    })
    .then(contract => {
      dataToReturn.address = contract.options.address
      return dataToReturn
    })
}
