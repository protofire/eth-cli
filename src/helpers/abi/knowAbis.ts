import erc20Abi from './erc20.json'
import erc721Abi from './erc721.json'
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

export const getAbiByName = (abiName: string): string | null => {
  const abiInLowerCase = abiName.toUpperCase()
  const returnAbi = ABI_META_DATA.find(abi => abi.name === abiInLowerCase)
  if (returnAbi) {
    return JSON.stringify(returnAbi.abiItem)
  }
  return null
}
