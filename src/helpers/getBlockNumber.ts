import Web3 from 'web3'

export const getBlockNumber = function(url: string) {
  if (!url) {
    throw new Error('[getBlockNumber] URL required')
  }

  // Connect web3
  const web3 = new Web3(new Web3.providers.HttpProvider(url))

  return web3.eth.getBlockNumber()
}
