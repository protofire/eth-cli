import { evaluatePrefix, generateAccount, range } from './utils'

export const randomAddress = (amount: number, prefix: string | null) => {
  if (isNaN(amount) || amount === 0) {
    throw new Error('[random-address] amount must be an integer number and greater than 0')
  }

  prefix = evaluatePrefix(prefix)

  if (prefix === null) {
    throw new Error('[random-address] prefix must be a valid hex value')
  }

  const findAccount = generateAccount(prefix)

  return range(amount)
    .map(() => findAccount())
    .map(({ address, privateKey }) => ({ address, privateKey }))
}
