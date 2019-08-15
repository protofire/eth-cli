import Conf from 'conf'

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
