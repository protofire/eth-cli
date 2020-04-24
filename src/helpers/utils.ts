import { randomBytes } from 'crypto'
import Accounts from 'web3-eth-accounts'
import HttpProvider from 'web3-providers-http'

export const add0x = (hex: string) => {
  return hex.indexOf('0x') === 0 ? hex : `0x${hex}`
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

const createAccount = () => {
  const { wallet } = new Accounts(new HttpProvider(''))

  return wallet.create(1, randomBytes(32).toString('hex'))[0]
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

export const isBN = (x: any) => x._hex !== undefined

export const isPrivateKey = (s: string) => {
  return /^(0x)?[0-9a-fA-F]{64}$/.test(s)
}

export const isAddress = (s: string) => {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(s)
}

export const sleep = (timeout: number) => new Promise(res => setTimeout(res, timeout))
