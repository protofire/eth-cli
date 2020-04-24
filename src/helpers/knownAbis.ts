import erc20Abi from './abi/erc20.json'
import erc721Abi from './abi/erc721.json'

export type Abis = { [name: string]: object }

export const knownAbis: Abis = {
  erc20: erc20Abi,
  erc721: erc721Abi,
}
