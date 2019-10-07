import erc20Abi from './abi/erc20.json'
import erc721Abi from './abi/erc721.json'
import { config } from './config'

type Abis = { [name: string]: object }

const ABI_META_DATA: Abis = {
  erc20: erc20Abi,
  erc721: erc721Abi,
}

const getKnownAbis = () => {
  const addedAbis: Abis = config.get('abis', {})
  const knownAbis = { ...ABI_META_DATA, ...addedAbis }
  return knownAbis
}

export const getAbiByName = (name: string): object | null => {
  const knownAbis = getKnownAbis()
  if (knownAbis[name]) {
    return knownAbis[name]
  }
  return null
}

export const getStringAbiByName = (abiName: string): string | null => {
  const abiObj = getAbiByName(abiName)
  if (abiObj) {
    return JSON.stringify(abiObj)
  }
  return abiObj
}

export const getAbiList = (): string[] => {
  const knownAbis = getKnownAbis()
  return Object.keys(knownAbis)
}
