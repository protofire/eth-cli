import Table from 'cli-table'
import { randomBytes } from 'crypto'
import * as fs from 'fs'
import { Accounts } from 'web3-eth-accounts'
import { HttpProvider } from 'web3-providers'

export const showDataWithDisplay = (data: any, display: any) => {
  if (display.toLowerCase() === 'table') {
    const table = new Table({
      head: Object.keys(data)
    })

    table.push(Object.values(data))

    return table.toString()
  } else {
    return data
  }
}

export const add0x = (hex: any) => {
  return hex.indexOf('0x') === 0 ? hex : `0x${hex}`
}

export const loadABI = (abiPath: any) => {
  const abiStr = fs.readFileSync(abiPath).toString()

  let abi = null

  try {
    abi = JSON.parse(abiStr)

    // Allow using truffle artifacts files too.
    // If abi variable it's an object and it has an abi property, interpret it as a truffle artifact
    if (abi.abi) {
      abi = abi.abi
    }
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.error('Error parsing abi', e)
    process.exit(1)
  }

  return abi
}

export const extractMethodObjectsFromABI = (abi: any) => {
  return abi.filter((x: any) => x.type === 'function' && x.name)
}

/**
 * Evaluates a method call structure and returns an object with the information validated
 */
export const evaluateMethodCallStructure = (methodCall: any) => {
  const isValidMethod = /^(\w+)\((.*)\)$/
  const method = isValidMethod.exec(methodCall)

  return {
    methodCall,
    methodName: method ? method[1] : null,
    methodArgs: method ? method[2] : null,
    methodValid: !!method
  }
}

export const generateAccount = (prefix: any) => () => {
  let account = createAccount()

  while (account.address.slice(2, 2 + prefix.length) !== prefix) {
    account = createAccount()
  }

  return account
}

export const range = (amount: any) => new Array(parseInt(amount, 10)).fill(true)

export const evaluatePrefix = (prefix: any) => {
  const isValidPrefix = /(^$|^[a-fA-F0-9]+)$/
  const match = isValidPrefix.exec(prefix)

  return match ? match[1] : null
}

const createAccount = () => {
  const { wallet } = new Accounts(new HttpProvider(''))

  return wallet.create(1, randomBytes(32).toString('hex'))[0]
}
