import * as path from 'path'
import Web3 from 'web3'

import { replStarter } from './replStarter'
import { loadABI } from './utils'

interface ReplContext {
  [key: string]: any
}

export function loadContract(abiPath: string, address: string, rest: string, url: string) {
  if (!url) {
    throw new Error('[loadContract] URL require')
  }

  let abisAndAddresses = [
    {
      abiPath,
      abi: loadABI(abiPath),
      address,
    },
  ]

  for (let i = 0; i < rest.length; i += 2) {
    const [abiPath, address] = rest.slice(i, i + 2)
    abisAndAddresses.push({
      abiPath,
      abi: loadABI(abiPath),
      address,
    })
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  // Default context
  let replContext: ReplContext = {
    web3,
    eth: web3.eth,
  }

  // Add contracts into context
  for (let contract of abisAndAddresses) {
    const Contract = new web3.eth.Contract(contract.abi, contract.address)
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
