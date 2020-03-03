import Web3 from 'web3'

export const getBlock = function(blockNumber: number, url: string) {
  // Connect web3
  const web3 = new Web3(url)

  return web3.eth.getBlock(blockNumber)
}
