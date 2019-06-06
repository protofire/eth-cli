import * as path from 'path'
import Web3 from 'web3'

import { replStarter } from './replStarter'
import { loadABI } from './utils'

interface ReplContext {
  [key: string]: any
}

export function startRepl(url: string, contracts: Array<{ abiPath: string; address: string }>) {
  if (!url) {
    throw new Error('[startRepl] URL require')
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  // Default context
  let replContext: ReplContext = {
    web3,
    eth: web3.eth,
  }

  // Add contracts into context
  for (let contract of contracts) {
    const abi = loadABI(contract.abiPath)
    const Contract = new web3.eth.Contract(abi, contract.address)
    let [contractName] = path.basename(contract.abiPath).split('.')

    if (replContext[contractName]) {
      const suffix = Object.keys(replContext).filter(function(key) {
        return key.includes(contractName)
      }).length

      contractName = [contractName, '_', suffix].join('')
    }

    replContext[contractName] = Contract
  }

  // Start REPL
  replStarter(replContext)
}
