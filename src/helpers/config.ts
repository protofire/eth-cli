import Conf from 'conf'

import { NetworkInfo } from '../types'

import { add0x } from './utils'

export const config = new Conf<any>({ projectName: 'eth-cli' })

export const getPrivateKey = (privateKeyOrKnownAddress: string) => {
  const addresses = config.get('addresses', {})

  // if it's a known address, use its private key; throw error if it doesn't have one
  // otherwise, interpret the parameter as a private key
  let privateKey
  if (addresses[privateKeyOrKnownAddress]) {
    if (addresses[privateKeyOrKnownAddress].privateKey) {
      privateKey = addresses[privateKeyOrKnownAddress].privateKey
    } else {
      throw new Error("Selected address doesn't have a known private key")
    }
  } else {
    privateKey = privateKeyOrKnownAddress
  }

  return add0x(privateKey)
}

export const getAddress = (addressOrKnownAddress: string) => {
  const addresses = config.get('addresses', {})

  const knownAddress = addresses[addressOrKnownAddress]

  return add0x(knownAddress ? knownAddress.address : addressOrKnownAddress)
}

type Networks = { [name: string]: NetworkInfo }

const defaultNetworks: Networks = {
  mainnet: { url: 'https://mainnet.infura.io', id: 1, label: 'Mainnet' },
  ropsten: { url: 'https://ropsten.infura.io', id: 3, label: 'Ropsten' },
  rinkeb: { url: 'https://rinkeby.infura.io', id: 4, label: 'Rinkeby' },
  goerli: { url: 'https://goerli.infura.io', id: 5, label: 'Görli' },
  kovan: { url: 'https://kovan.infura.io', id: 42, label: 'Kovan' },
}

export const getNetworks = (): Networks => {
  const addedNetworks = config.get('networks', {})

  return { ...defaultNetworks, ...addedNetworks }
}

export const updateNetworks = (networks: Networks): void => {
  config.set('networks', networks)
}
