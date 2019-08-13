import _ from 'lodash'

import erc20Abi from './abi/erc20.json'
import erc721Abi from './abi/erc721.json'
import { config } from './config'

interface AbiItem {
  name: string
  abi: object
}

const ABI_META_DATA: AbiItem[] = [
  { name: 'ERC20', abi: erc20Abi },
  { name: 'ERC721', abi: erc721Abi },
]

const getKnownAbis = () => {
  const addedAbis: AbiItem[] = config.get('abis', [])
  const knownAbis = [...ABI_META_DATA, ...addedAbis]
  return knownAbis
}

export const getAbiByName = (abiName: string): object | null => {
  const knownAbis = getKnownAbis()
  const index = _.findIndex(knownAbis, item => item.name.toLowerCase() === abiName.toLowerCase())
  if (index !== -1) {
    return knownAbis[index].abi
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
  return knownAbis.map(item => item.name)
}
