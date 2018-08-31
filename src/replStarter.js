const os = require('os')
const path = require('path')
const fs = require('fs')
const repl = require('repl')
const vm = require('vm')
const Web3 = require('web3')

const historyFile = path.join(os.homedir(), '.eth_cli_history')

module.exports = function(context) {
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

  r.context.Web3 = Web3
  
  for (expose of Object.keys(context)) {
    r.context[expose] = context[expose]
  }

  require('repl.history')(r, historyFile)
}
