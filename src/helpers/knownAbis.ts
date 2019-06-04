import erc20Abi from './abi/erc20.json'
import erc721Abi from './abi/erc721.json'
interface AbiMetaData {
  name: string
  abiItem: any
}

const ABI_META_DATA: AbiMetaData[] = [
  {
    name: 'ERC20',
    abiItem: erc20Abi,
  },
  {
    name: 'ERC721',
    abiItem: erc721Abi,
  },
]

export const getAbiByName = (abiName: string): any => {
  const abiInUpperCase = abiName.toUpperCase()
  const returnAbi = ABI_META_DATA.find(abi => abi.name === abiInUpperCase)
  if (returnAbi) {
    return returnAbi.abiItem
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
  return ABI_META_DATA.map(item => {
    return item.name
  })
}
