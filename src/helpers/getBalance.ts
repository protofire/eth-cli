import Web3 from 'web3'

import { configService } from './config-service'

export const getBalance = async function(addressOrName: string, url: string) {
  // Connect web3
  const web3 = new Web3(url)
  const networkId = await web3.eth.net.getId()
  const address = configService.getAddress(addressOrName, networkId)

  return web3.eth.getBalance(address)
}
