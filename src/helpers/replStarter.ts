import * as os from 'os'
import * as path from 'path'
import * as repl from 'repl'
import replHistory from './replHistory'
import * as vm from 'vm'
import Web3 from 'web3'

import { isBN } from './utils'

const historyFile = path.join(os.homedir(), '.eth_cli_history')

function isRecoverableError(error: Error) {
  if (error.name === 'SyntaxError') {
    return /^(Unexpected end of input|Unexpected token)/.test(error.message)
  }
  return false
}

function handleResult(result: any, callback: any) {
  if (result && result.then) {
    result
      .then((x: any) => {
        handleResult(x, callback)
      })
      .catch((e: Error) => callback(e, null))
  } else if (result && isBN(result)) {
    callback(null, result.toString())
  } else if (result && result._method && result.call) {
    handleResult(result.call(), callback)
  } else {
    callback(null, result)
  }
}

export function replStarter(context: { [key: string]: any }, prompt: string): repl.REPLServer {
  const r = repl.start({
    prompt,
    eval: (cmd, context, _, callback) => {
      try {
        const result = vm.runInContext(cmd, context, {
          displayErrors: false,
        })

        handleResult(result, callback)
      } catch (e) {
        if (isRecoverableError(e)) {
          return callback(new repl.Recoverable(e), null)
        }

        callback(e, null)
      }
    },
  })

  r.context.Web3 = Web3

  for (const expose of Object.keys(context)) {
    r.context[expose] = context[expose]
  }

  replHistory(r, historyFile)

  return r
}
