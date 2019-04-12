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
