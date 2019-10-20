import { Interface } from '@ethersproject/abi'
import { randomBytes } from 'crypto'
import * as fs from 'fs'
import * as _ from 'lodash'
import * as path from 'path'
import Accounts from 'web3-eth-accounts'
import HttpProvider from 'web3-providers-http'

import { ABI, ABIItem } from '../types'

import { getAddress } from './config'
import { getStringAbiByName } from './knownAbis'

export const getContract = (abiAtAddress: string, networkId: string) => {
  const [abiArg, addressArg] = abiAtAddress.split('@')
  if (!abiArg || !addressArg) {
    throw new Error(`Invalid argument '${abiAtAddress}', expected <abi>@<contractAddress>`)
  }

  const { abi, name } = loadABI(abiArg)
  const address = getAddress(addressArg, networkId)

  return {
    abi,
    address,
    name,
  }
}

export const add0x = (hex: string) => {
  return hex.indexOf('0x') === 0 ? hex : `0x${hex}`
}

export const loadABI = (abiPath: string): { abi: any; name: string } => {
  // Try to get the abi from the default list of supported abi's
  let abiStr: string | null = getStringAbiByName(abiPath)
  let name: Maybe<string> = null

  if (abiStr) {
    name = _.camelCase(abiPath)
  } else {
    if (fs.existsSync(abiPath)) {
      // If not found, check if the given string is a path to a file
      let [filename] = path.basename(abiPath).split('.')
      name = _.camelCase(filename)
      abiStr = fs.readFileSync(abiPath).toString()
    } else {
      // if it's not a file, check if it's a human readable ABI
      name = 'contract'
      const iface: any = new Interface([abiPath])

      // fix for null components
      const fragment = JSON.parse(JSON.stringify(iface.fragments[0]))
      const inputs = fragment.inputs.map((x: any) => {
        if (x.components === null) {
          delete x.components
        }
        return x
      })
      const outputs = fragment.outputs
        ? fragment.outputs.map((x: any) => {
            if (x.components === null) {
              delete x.components
            }
            return x
          })
        : []
      const fixedFragment = {
        ...fragment,
        inputs,
        outputs,
      }
      abiStr = JSON.stringify([fixedFragment])
    }
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
    console.error('Error parsing abi', e)
    process.exit(1)
  }

  return { abi, name }
}

export const extractMethodsAndEventsFromABI = (
  abi: ABI,
): Array<{ name: string | undefined; inputs: any | undefined; kind: 'function' | 'event' }> => {
  return abi
    .filter((x: ABIItem) => x.type === 'function' || (x.type === 'event' && 'name' in x))
    .map(({ name, inputs, type }) => ({
      name,
      inputs,
      kind: type === 'function' ? 'function' : 'event',
    }))
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
