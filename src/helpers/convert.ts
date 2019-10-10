import Big from 'big.js'

import { Unit } from '../types'

export const stringToUnit = (unit: string): Maybe<Unit> => {
  const unitLowerCased = unit.toLowerCase()
  if (unitLowerCased === Unit.Eth) {
    return Unit.Eth
  } else if (unitLowerCased === Unit.Gwei) {
    return Unit.Gwei
  } else if (unitLowerCased === Unit.Wei) {
    return Unit.Wei
  }

  return null
}

export const convert = (amount: string, from: Unit, to: Unit): string => {
  const amountBN = new Big(amount)

  let exp = 0
  if (from === Unit.Gwei) {
    exp -= 9
  } else if (from === Unit.Wei) {
    exp -= 18
  }
  if (to === Unit.Gwei) {
    exp += 9
  } else if (to === Unit.Wei) {
    exp += 18
  }

  const scale = new Big(10).pow(exp)

  if (to === Unit.Eth) {
    return amountBN.mul(scale).toFixed(4)
  }
  return amountBN.mul(scale).toFixed(0)
}
