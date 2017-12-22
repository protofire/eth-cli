const os = require('os')
const path = require('path')
const repl = require('repl')
const vm = require('vm')
const Web3 = require('web3')

const historyFile = path.join(os.homedir(), '.eth_cli_history')

module.exports = function(url) {
  url = url || 'http://localhost:8545'
  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

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

  r.context.web3 = web3
  r.context.eth = web3.eth

  require('repl.history')(r, historyFile)
}
