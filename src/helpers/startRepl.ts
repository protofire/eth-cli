import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import Web3 from 'web3'

import { configService } from './config-service'
import { replStarter } from './replStarter'
import { Contract } from '../types'

interface ReplContext {
  [key: string]: any
}

export async function startRepl(
  url: string,
  prompt: string,
  contracts: Array<Contract>,
  privateKeyOrKnownAddress: string | undefined,
) {
  if (!url) {
    throw new Error('[startRepl] URL require')
  }

  // Connect web3
  const web3 = new Web3(url)
  const networkId = await web3.eth.net.getId()

  // Default context
  const replContext: ReplContext = {
    web3,
    eth: web3.eth,
  }

  const accounts = await web3.eth.getAccounts()
  if (privateKeyOrKnownAddress) {
    const privateKey = configService.getPrivateKey(privateKeyOrKnownAddress, networkId)
    const account = web3.eth.accounts.wallet.add(privateKey)
    if (!accounts.includes(account.address)) {
      accounts.push(account.address)
    }
  }
  replContext.accounts = accounts

  const loadedContracts: { [name: string]: string } = {}

  const addContract = (contract: Contract, replContext: any) => {
    const transactionConfirmationBlocks = 3
    const options = {
      transactionConfirmationBlocks,
    }
    const Contract: any = web3.eth.Contract // ts hack: transactionConfirmationBlocks is not a valid option

    const contractInstance = new Contract(contract.abi, contract.address, options)

    let contractName = contract.name
    if (replContext[contractName]) {
      const suffix = Object.keys(replContext).filter(function(key) {
        return key.includes(contractName)
      }).length

      contractName = [contractName, '_', suffix].join('')
    }

    replContext[contractName] = contractInstance
    loadedContracts[contractName] = contract.address
  }

  // Add contracts into context
  for (const contract of contracts) {
    addContract(contract, replContext)
  }

  // Start REPL
  const r = replStarter(replContext, prompt)

  // run init file
  const replInitFile = path.join(os.homedir(), '.eth_cli_repl_init.js')

  if (fs.existsSync(replInitFile)) {
    const replInit = (await import(replInitFile)).default
    replInit(r.context)
  }

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
      const contract = configService.loadContract(abiAndAddress, networkId)
      addContract(contract, r.context)
      this.displayPrompt()
    },
  })
}
