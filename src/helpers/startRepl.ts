import _ from 'lodash'
import * as path from 'path'
import Web3 from 'web3'

import { getPrivateKey } from './config'
import { replStarter } from './replStarter'
import { loadABI } from './utils'

interface ReplContext {
  [key: string]: any
}

export async function startRepl(
  url: string,
  prompt: string,
  contracts: Array<{ abiPath: string; address: string }>,
  privateKeyOrKnownAddress: string | undefined,
) {
  if (!url) {
    throw new Error('[startRepl] URL require')
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  if (privateKeyOrKnownAddress) {
    const privateKey = getPrivateKey(privateKeyOrKnownAddress)
    web3.eth.accounts.wallet.add(privateKey)
  }

  // Default context
  let replContext: ReplContext = {
    web3,
    eth: web3.eth,
  }

  const loadedContracts: { [name: string]: string } = {}

  const addContract = (abiPath: string, address: string, replContext: any) => {
    const abi = loadABI(abiPath)

    const transactionConfirmationBlocks = 3
    const options = {
      transactionConfirmationBlocks,
    }
    const Contract: any = web3.eth.Contract // ts hack: transactionConfirmationBlocks is not a valid option

    const contractInstance = new Contract(abi, address, options)
    let [contractName] = path.basename(abiPath).split('.')

    let contractNameCamelCased = _.camelCase(contractName)

    if (replContext[contractNameCamelCased]) {
      const suffix = Object.keys(replContext).filter(function(key) {
        return key.includes(contractNameCamelCased)
      }).length

      contractNameCamelCased = [contractNameCamelCased, '_', suffix].join('')
    }

    replContext[contractNameCamelCased] = contractInstance
    loadedContracts[contractNameCamelCased] = address
  }

  // Add contracts into context
  for (let contract of contracts) {
    addContract(contract.abiPath, contract.address, replContext)
  }

  const accounts = await web3.eth.getAccounts()
  replContext.accounts = accounts

  // Start REPL
  const r = replStarter(replContext, prompt)

  r.defineCommand('contracts', {
    help: 'Show loaded contracts',
    action() {
      this.clearBufferedCommand()
      for (const [loadedContract, address] of Object.entries(loadedContracts)) {
        console.log(`${loadedContract} (${address})`)
      }
      this.displayPrompt()
    },
  })

  r.defineCommand('loadc', {
    help: 'Load a contract using the specified ABI and address',
    action(abiAndAddress: string) {
      this.clearBufferedCommand()
      const [abiPath, address] = abiAndAddress.split('@')
      addContract(abiPath, address, r.context)
      this.displayPrompt()
    },
  })
}
