import { NetworkInfo } from '../types'

export type Networks = { [name: string]: NetworkInfo }

export const defaultNetworks: Networks = {
  mainnet: {
    url: 'https://mainnet.infura.io/v3/76fb6c10f1584483a45a0a28e91b07ad',
    id: 1,
    label: 'Mainnet',
  },
  ropsten: {
    url: 'https://ropsten.infura.io/v3/76fb6c10f1584483a45a0a28e91b07ad',
    id: 3,
    label: 'Ropsten',
  },
  rinkeby: {
    url: 'https://rinkeby.infura.io/v3/76fb6c10f1584483a45a0a28e91b07ad',
    id: 4,
    label: 'Rinkeby',
  },
  goerli: {
    url: 'https://goerli.infura.io/v3/76fb6c10f1584483a45a0a28e91b07ad',
    id: 5,
    label: 'Görli',
  },
  kovan: {
    url: 'https://kovan.infura.io/v3/76fb6c10f1584483a45a0a28e91b07ad',
    id: 42,
    label: 'Kovan',
  },
}
