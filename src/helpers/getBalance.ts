import Web3 from 'web3'

import { getAddress } from './config'

export const getBalance = async function(addressOrName: string, url: string) {
  // Connect web3
  const web3 = new Web3(url)
  const networkId = await web3.eth.net.getId()
  const address = getAddress(addressOrName, String(networkId))

  return web3.eth.getBalance(address)
}
