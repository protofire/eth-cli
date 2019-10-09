import _ from 'lodash'
import * as path from 'path'
import Web3 from 'web3'

import { getAddress, getPrivateKey } from './config'
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
  const networkId = await web3.eth.net.getId()

  // Default context
  let replContext: ReplContext = {
    web3,
    eth: web3.eth,
  }

  const accounts = await web3.eth.getAccounts()
  if (privateKeyOrKnownAddress) {
    const privateKey = getPrivateKey(privateKeyOrKnownAddress, String(networkId))
    const account = web3.eth.accounts.wallet.add(privateKey)
    if (!accounts.includes(account.address)) {
      accounts.push(account.address)
    }
  }
  replContext.accounts = accounts

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
    addContract(contract.abiPath, getAddress(contract.address, String(networkId)), replContext)
  }

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
