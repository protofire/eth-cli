import Web3 from 'web3'

export const getNetworkId = function(url: string) {
  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  return web3.eth.net.getId()
}
