const os = require('os')
const path = require('path')
const fs = require('fs')
const repl = require('repl')
const vm = require('vm')
const Web3 = require('web3')

const historyFile = path.join(os.homedir(), '.eth_cli_history')

module.exports = function(abiPath, address) {
  // Get abi and address from argv
  const abiStr = fs.readFileSync(abiPath).toString()
  let abi = null
  try {
    abi = JSON.parse(abiStr)
  } catch (e) {
    console.log('Error parsing abi', e)
    process.exit(1)
  }

  // Connect web3
  const web3 = new Web3(
    new Web3.providers.HttpProvider('http://localhost:8545')
  )

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

  require('repl.history')(r, historyFile)
}
