const os = require('os')
const path = require('path')
const fs = require('fs')
const repl = require('repl')
const vm = require('vm')
const Web3 = require('web3')

const historyFile = path.join(os.homedir(), '.eth_cli_history')

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

  const r = repl.start({
    prompt: '> ',
    eval: (cmd, context, filename, callback) => {
      try {
        const result = vm.runInContext(cmd, context, {
          displayErrors: false
        })

        if (result && result.then) {
          result.then(x => callback(null, x)).catch(e => callback(e))
        } else {
          callback(null, result)
        }
      } catch (e) {
        callback(e)
      }
    }
  })

  r.context.Contract = Contract
  r.context.web3 = web3
  r.context.eth = web3.eth

  require('repl.history')(r, historyFile)
}
