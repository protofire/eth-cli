const replStarter = require('./replStarter')
const Web3 = require('web3')

module.exports = function(abiPath, address, url) {
  if (!url) {
    throw new Error('[loadContract] URL require')
  }

  // Get abi and address from argv
  const abiStr = fs.readFileSync(abiPath).toString()
  let abi = null
  try {
    abi = JSON.parse(abiStr)

    // Allow using truffle artifacts files too.
    // If abi variable it's an object and it has an abi property, interpret it as a truffle artifact
    if (abi !== null && typeof abi === 'object' && abi.abi) {
      abi = abi.abi
    }
  } catch (e) {
    console.log('Error parsing abi', e)
    process.exit(1)
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  // Get contract
  const Contract = new web3.eth.Contract(abi, address)

  // Start REPL
  replStarter({
    Contract: Contract,
    web3: web3,
    eth: web3.eth
  })
}
