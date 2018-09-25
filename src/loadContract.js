const fs = require('fs')
const path = require('path')
const replStarter = require('./replStarter')
const Web3 = require('web3')

module.exports = function(abiPath, address, rest, url) {
  if (!url) {
    throw new Error('[loadContract] URL require')
  }

  let abisAndAddresses = [
    {
      abiPath: abiPath,
      abi: parseAbi(abiPath),
      address: address
    }
  ]

  for (let i = 0; i < rest.length; i += 2) {
    const [abiPath, address] = rest.slice(i, i + 2)
    abisAndAddresses.push({
      abiPath: abiPath,
      abi: parseAbi(abiPath),
      address: address
    })
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  // Default context
  let rplContext = {
    web3: web3,
    eth: web3.eth
  }

  // Add contracts into context
  for (let contract of abisAndAddresses) {
    const Contract = new web3.eth.Contract(contract.abi, contract.address)
    let [contractName] = path.basename(contract.abiPath).split('.')

    if (rplContext[contractName]) {
      const suffix = Object.keys(rplContext).filter(function(key) {
        return key.includes(contractName)
      }).length

      contractName = [contractName, '_', suffix].join('')
    }

    rplContext[contractName] = Contract
  }

  // Start REPL
  replStarter(rplContext)
}

function parseAbi(abiPath) {
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

  return abi
}
