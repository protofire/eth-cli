import { randomBytes } from 'crypto'
import * as fs from 'fs'
import { Accounts } from 'web3-eth-accounts'
import { HttpProvider } from 'web3-providers'

import { ABI, ABIItem } from '../types'

import { getStringAbiByName } from './knownAbis'

export const add0x = (hex: string) => {
  return hex.indexOf('0x') === 0 ? hex : `0x${hex}`
}

export const loadABI = (abiPath: string) => {
  // Try to get the abi from the default list of supported abi's
  let abiStr: string | null = getStringAbiByName(abiPath)
  // If not found, just return the abi from the abiPath received
  if (!abiStr) {
    abiStr = fs.readFileSync(abiPath).toString()
  }
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

export const extractMethodObjectsFromABI = (abi: ABI) => {
  return abi.filter((x: ABIItem) => x.type === 'function' && 'name' in x)
}

/**
 * Evaluates a method call structure and returns an object with the information validated
 */
export const evaluateMethodCallStructure = (methodCall: string) => {
  const isValidMethod = /^(\w+)\((.*)\)$/
  const method = isValidMethod.exec(methodCall)

  return {
    methodCall,
    methodName: method ? method[1] : null,
    methodArgs: method ? method[2] : null,
    methodValid: !!method,
  }
}

export const generateAccount = (prefix: string) => () => {
  let account = createAccount()

  while (account.address.slice(2, 2 + prefix.length) !== prefix) {
    account = createAccount()
  }

  return account
}

export const range = (amount: number) => new Array(amount).fill(true)

export const evaluatePrefix = (prefix: string) => {
  const isValidPrefix = /(^$|^[a-fA-F0-9]+)$/
  const match = isValidPrefix.exec(prefix)

  return match ? match[1] : null
}

const createAccount = () => {
  const { wallet } = new Accounts(new HttpProvider(''))

  return wallet.create(1, randomBytes(32).toString('hex'))[0]
}
