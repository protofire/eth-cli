import Web3 from 'web3'
import { evaluatePrefix, generateAccount, range } from './utils'

export const randomAddress = (amount: number, prefix: string) => {
  if (isNaN(amount) || amount === 0) {
    throw new Error('[random-address] amount must be an integer number and greater than 0')
  }

  const maybePrefix = evaluatePrefix(prefix)

  if (maybePrefix === null) {
    throw new Error('[random-address] prefix must be a valid hex value')
  }

  const findAccount = generateAccount(maybePrefix)

  return range(amount)
    .map(() => findAccount())
    .map(({ address, privateKey }) => ({ address, privateKey }))
}

export const generateKeystore = async (privateKey: string, password: string) => {
  const web3 = new Web3()
  return web3.eth.accounts.encrypt(privateKey, password)
}
