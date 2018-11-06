const fs = require('fs')
module.exports.showDataWithDisplay = (data, display) => {
  if (display.toLowerCase() === 'table') {
    const Table = require('cli-table')

    const table = new Table({
      head: Object.keys(data)
    })

    table.push(Object.values(data))

    console.log(table.toString())
  } else {
    console.log(JSON.stringify(data, null, 2))
  }
}

module.exports.add0x = hex => {
  return hex.indexOf('0x') === 0 ? hex : `0x${hex}`
}

module.exports.loadABI = abiPath => {
  const abiStr = fs.readFileSync(abiPath).toString()

  let abi = null

  try {
    abi = JSON.parse(abiStr)

    // Allow using truffle artifacts files too.
    // If abi variable it's an object and it has an abi property, interpret it as a truffle artifact
    if (abi.abi) {
      abi = abi.abi
    }
  } catch (e) {
    console.log('Error parsing abi', e)
    process.exit(1)
  }

  return abi
}

module.exports.extractMethodObjectsFromABI = function(abi) {
  return abi.filter(x => x.type === 'function' && x.name)
}

/**
 * Evaluates a method call structure and returns an object with the information validated
 * @param methodCall
 * @returns {{
 *  methodCall: (string|null),
 *  methodName: (string|null),
 *  methodArgs: (string|null),
 *  methodValid: boolean
 * }}
 */
module.exports.evaluateMethodCallStructure = function(methodCall) {
  const isValidMethod = /^(\w+)\((.*)\)$/
  const method = isValidMethod.exec(methodCall)

  return {
    methodCall,
    methodName: method ? method[1] : null,
    methodArgs: method ? method[2] : null,
    methodValid: !!method
  }
}

module.exports.generateAccount = prefix => () => {
  let account = createAccount()

  while (account.address.slice(2, 2 + prefix.length) !== prefix) {
    account = createAccount()
  }

  return account
}

module.exports.range = amount => new Array(parseInt(amount)).fill(true)

module.exports.evaluatePrefix = prefix => {
  const isValidPrefix = /^([a-fA-F0-9])*$/
  const match = isValidPrefix.exec(prefix)

  return match ? match[1] : null
}

function createAccount() {
  const { randomBytes } = require('crypto')
  const wallet = new (require('web3-eth-accounts'))().wallet

  return wallet.create(1, randomBytes(32))[0]
}
