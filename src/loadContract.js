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

  if (rest.length > 0) {
    for (let i = 0; i < rest.length; i += 2) {
      const chunk = rest.slice(i, i + 2)
      abisAndAddresses.push({
        abiPath: chunk[0],
        abi: parseAbi(chunk[0]),
        address: chunk[1]
      })
    }
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
    let contractName = path.basename(contract.abiPath).split('.')[0]

    if (rplContext[contractName]) {
      const sufix = Object.keys(rplContext).filter(function(key) {
        return key.includes(contractName)
      }).length

      contractName = [contractName, '_', sufix].join('')
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
