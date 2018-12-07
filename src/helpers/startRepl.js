const Web3 = require('web3')
const replStarter = require('./replStarter')

module.exports = function(url) {
  if (!url) {
    throw new Error('[startRepl] URL require')
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  // Start REPL
  replStarter({
    web3: web3,
    eth: web3.eth
  })
}
